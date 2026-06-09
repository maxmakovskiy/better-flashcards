import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from '@/prisma'
import { EnhancedStudySessionModel } from '@/app/flashcards/types'
import { ServerAnalyticsSchema } from '../../flashcards/_schemas/analytics-schema'
import { DeckModel } from "@/../prisma/generated/prisma/models/Deck"
import { FlashcardModel } from "@/../prisma/generated/prisma/models/Flashcard"
import { intervalToDuration } from 'date-fns'

// endpoint to create new deck
export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }

    try {
        const body = await req.json().then(r => ServerAnalyticsSchema.safeParse(r))
        if (!body.success) {
            return NextResponse.json(
                { message: "Wrong data provided" },
                { status: 400 }
            )
        }

        if (body.data.startDate === null || body.data.endDate === null) {
            return NextResponse.json(
                { message: "Full range" },
                { status: 200 }
            )
        }

        const addedDecks: DeckModel[] = await prisma.deck.findMany({
            where: {
                userId: req.auth.user?.id,
                createdAt: {
                    gte: body.data.startDate,
                    lte: body.data.endDate
                }
            }
        })

        const addedCards: FlashcardModel[] = await prisma.flashcard.findMany({
            where: {
                deck: {
                    userId: req.auth.user?.id,
                },
                createdAt: {
                    gte: body.data.startDate,
                    lte: body.data.endDate
                }
            }
        })

        const studySessions: EnhancedStudySessionModel[] = await prisma.studySession.findMany({
            where: {
                deck: {
                    userId: req.auth.user?.id,
                },
                NOT: {
                    endedAt: null
                },
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
            },
            include: {
                reviewedCards: true
            }
        })

        const totalMs = studySessions.reduce((accMs: number, currSession: EnhancedStudySessionModel) => {
            return accMs + (currSession.endedAt!.getTime() - currSession.startedAt.getTime())
        }, 0)
        const timeSpentStudying = intervalToDuration({ start: 0, end: totalMs })


        return NextResponse.json({
            numDeckAdded: addedDecks.length,
            numCardsAdded: addedCards.length,
            studyTime: timeSpentStudying,
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

