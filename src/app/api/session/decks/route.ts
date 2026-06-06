import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from '@/prisma'
import { EnhancedDeckModel } from '@/app/flashcards/types'
import { FlashcardModel } from "@/../prisma/generated/prisma/models/Flashcard"

// endpoint to retrieve decks that need to be reviewed
export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }

    try {
        const allDecks: EnhancedDeckModel[] = await prisma.deck.findMany({
            where: {
                userId: req.auth.user?.id as string
            },
            include: {
                flashcards: true
            }
        })

        const now = new Date();
        const isCardToReview = (card: FlashcardModel) => (
            !card.lastReviewedAt || !(card.nextReviewAt > now))

        const decksToReview = allDecks.filter((deck: EnhancedDeckModel) => {
            return deck.flashcards.find(isCardToReview) !== undefined
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


