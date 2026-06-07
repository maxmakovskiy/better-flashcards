import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from '@/prisma'
import { EnhancedDeckModel, EnhancedStudyDeckModel } from '@/app/flashcards/types'
import { FlashcardModel } from "@/../prisma/generated/prisma/models/Flashcard"
import { StudySessionModel } from "@/../prisma/generated/prisma/models/StudySession"

// endpoint to retrieve decks that need to be reviewed
export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }

    try {
        const allDecks: EnhancedStudyDeckModel[] = await prisma.deck.findMany({
            where: {
                userId: req.auth.user?.id as string,
            },
            include: {
                flashcards: true,
                studySessions: {
                    orderBy: {
                        startedAt: 'desc'
                    }
                }
            },
        })

        // TODO: replace this filtering with 'some' in Prisma?
        const now = new Date();
        const isCardToReview = (card: FlashcardModel) => (
            !card.lastReviewAt || !(card.nextReviewAt > now))

        const decksToReview: EnhancedStudyDeckModel[] = allDecks.filter((deck: EnhancedStudyDeckModel) => {
            return deck.flashcards.find(isCardToReview) !== undefined
        }).map((deck: EnhancedStudyDeckModel) => {
            // keep only unfinished sessions
            const sessions: StudySessionModel[] = deck.studySessions.filter(session => !session.endedAt)
            return {
                ...deck,
                studySessions: ((sessions.length !== 0) && (!!sessions[0].endedAt)) ? [sessions[0]] : []
            } as EnhancedStudyDeckModel
        })
        return NextResponse.json(decksToReview)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})


