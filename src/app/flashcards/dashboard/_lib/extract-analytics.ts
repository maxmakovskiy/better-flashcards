import { prisma } from '@/prisma'
import { EnhancedStudySessionModel } from '@/app/flashcards/types'
import { type ClientAnalyticsSchema } from '@/app/flashcards/_schemas/analytics-schema'

export const extractAnalytics = async (userId: string, endDate: Date, startDate?: Date | null): Promise<ClientAnalyticsSchema> => {
    let createAtFilterMixin = {}
    let inRangeFilterMixin = {}
    if (!!startDate) {
        createAtFilterMixin = {
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        }
        inRangeFilterMixin = {
            AND: [
                {
                    startedAt: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                {
                    endedAt: {
                        gte: startDate,
                        lte: endDate
                    }
                },
            ]
        }
    }

    const addedDecksNumber = await prisma.deck.count({
        where: {
            userId: userId,
            createdAt: {
                lte: endDate,
            },
            ...createAtFilterMixin
        }
    })

    const addedCardsNumber = await prisma.flashcard.count({
        where: {
            deck: {
                userId: userId,
            },
            createdAt: {
                lte: endDate,
            },
            ...createAtFilterMixin
        }
    })

    const studySessions: EnhancedStudySessionModel[] = await prisma.studySession.findMany({
        where: {
            deck: {
                userId: userId,
            },
            NOT: {
                endedAt: null
            },
            AND: [
                {
                    startedAt: {
                        lte: endDate,
                    }
                },
                {
                    endedAt: {
                        lte: endDate,
                    }
                },
            ],
            ...inRangeFilterMixin
        },
        include: {
            reviewedCards: true,
            deck: true
        },
        orderBy: {
            endedAt: 'desc'
        }
    })

    const totalMs = studySessions.reduce((accMs: number, currSession: EnhancedStudySessionModel) => {
        if (currSession.endedAt === null) { return accMs }
        return accMs + (currSession.endedAt.getTime() - currSession.startedAt.getTime())
    }, 0)

    // latest reviews for given period of time
    const groupedReviews = await prisma.reviewHistory.groupBy({
        where: {
            sessionId: {
                in: studySessions.map(s => s.sessionId)
            }
        },
        by: ["flashcardNum", "deckId"],
        _max: {
            reviewedAt: true,
        }
    })
    const latestReviews = await prisma.reviewHistory.findMany({
        where: {
            OR: groupedReviews.map(review => ({
                flashcardNum: review.flashcardNum,
                deckId: review.deckId,
                reviewedAt: review._max.reviewedAt!,
            })),
        },
    });


    return {
        numDeckAdded: addedDecksNumber,
        numCardsAdded: addedCardsNumber,
        studyTimeMs: totalMs,
        studySessions: studySessions,
        latestReviews: latestReviews
    }
}