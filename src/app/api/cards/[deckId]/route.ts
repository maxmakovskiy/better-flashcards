import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { NextAuthRequest } from 'next-auth'
import { prisma } from '@/prisma'

// endpoint to create new card
export const POST = auth(async function POST(
    req: NextAuthRequest,
    { params }: { params: Promise<{ deckId: string }> }
) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }
    try {
        const { deckId } = await params
        const { frontText, backText } = await req.json()
        const flashcards = await prisma.flashcard.findMany({
            where: { deckId: deckId }
        })
        flashcards.sort((lhs, rhs) => rhs.flashcardNum - lhs.flashcardNum)
        const availableIndex: number = (flashcards.length === 0) ? 0 : (flashcards[0].flashcardNum + 1)

        // TODO: verify with Zod ?
        // https://zod.dev/api
        const newCard = await prisma.flashcard.create({
            data: {
                flashcardNum: availableIndex,
                deckId: deckId as string,
                frontText: frontText as string,
                backText: backText as string
            }
        })
        return NextResponse.json(newCard)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})

// endpoint to get all the cards for given deckId
export const GET = auth(async function GET(
    req: NextAuthRequest,
    { params }: { params: Promise<{ deckId: string }> }
) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }
    try {
        const { deckId } = await params
        const flashcards = await prisma.flashcard.findMany({
            where: { deckId: deckId }
        })
        return NextResponse.json(flashcards)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})


