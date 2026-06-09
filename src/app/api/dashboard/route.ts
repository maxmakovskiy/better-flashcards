import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from '@/prisma'
import { EnhancedStudySessionModel } from '@/app/flashcards/types'
import { ServerAnalyticsSchema } from '../../flashcards/_schemas/analytics-schema'
import { DeckModel } from "@/../prisma/generated/prisma/models/Deck"
import { FlashcardModel } from "@/../prisma/generated/prisma/models/Flashcard"

export const POST = auth(async function POST(req) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }

    try {
        const body = await req.json().then(r => {
            return ServerAnalyticsSchema.safeParse(r)
        })
        if (!body.success) {
            console.error(`Wrong data provided: ${body.error}`)
            return NextResponse.json(
                { message: "Wrong data provided" },
                { status: 400 }
            )
        }

        let createAtFilterMixin = {}
        let inRangeFilterMixin = {}
        if (!!body.data.startDate) {
            createAtFilterMixin = {
                createdAt: {
                    gte: body.data.startDate,
                    lte: body.data.endDate
                }
            }
            inRangeFilterMixin = {
                AND: [
                    {
                        startedAt: {
                            gte: body.data.startDate,
                            lte: body.data.endDate
                        }
                    },
                    {
                        endedAt: {
                            gte: body.data.startDate,
                            lte: body.data.endDate
                        }
                    },
                ]
            }
        }

        const addedDecks: DeckModel[] = await prisma.deck.findMany({
            where: {
                userId: req.auth!.user?.id,
                createdAt: {
                    lte: body.data.endDate,
                },
                ...createAtFilterMixin
            }
        })

        const addedCards: FlashcardModel[] = await prisma.flashcard.findMany({
            where: {
                deck: {
                    userId: req.auth!.user?.id,
                },
                createdAt: {
                    lte: body.data.endDate,
                },
                ...createAtFilterMixin
            }
        })

        const studySessions: EnhancedStudySessionModel[] = await prisma.studySession.findMany({
            where: {
                deck: {
                    userId: req.auth!.user?.id,
                },
                NOT: {
                    endedAt: null
                },
                AND: [
                    {
                        startedAt: {
                            lte: body.data.endDate,
                        }
                    },
                    {
                        endedAt: {
                            lte: body.data.endDate,
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

        return NextResponse.json({
            numDeckAdded: addedDecks.length,
            numCardsAdded: addedCards.length,
            studyTimeMs: totalMs,
            studySessions: studySessions,
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})

