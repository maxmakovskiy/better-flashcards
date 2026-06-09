import { prisma } from '@/prisma'
import { EnhancedStudySessionModel } from '@/app/flashcards/types'
import { DeckModel } from "@/../prisma/generated/prisma/models/Deck"
import { FlashcardModel } from "@/../prisma/generated/prisma/models/Flashcard"
import { type ClientAnalyticsSchema } from '@/app/flashcards/_schemas/analytics-schema'


export const extractAnalytics = async (userId: string, endDate: Date,startDate?: Date): Promise<ClientAnalyticsSchema> => {
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

    const addedDecks: DeckModel[] = await prisma.deck.findMany({
        where: {
            userId: userId,
            createdAt: {
                lte: endDate,
            },
            ...createAtFilterMixin
        }
    })

    const addedCards: FlashcardModel[] = await prisma.flashcard.findMany({
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
            reviewedCards: true
        }
    })

    const totalMs = studySessions.reduce((accMs: number, currSession: EnhancedStudySessionModel) => {
        return accMs + (currSession.endedAt!.getTime() - currSession.startedAt.getTime())
    }, 0)

    return {
        numDeckAdded: addedDecks.length,
        numCardsAdded: addedCards.length,
        studyTimeMs: totalMs,
        studySessions: studySessions,
    }
}