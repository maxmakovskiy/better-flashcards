import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { NextAuthRequest } from 'next-auth'
import { prisma } from '@/prisma'
import { FlashcardHandleSchema } from '@/app/flashcards/_schemas/flashcard-handle-schema'

// endpoint to create new card
export const POST = auth(async function POST(
    req: NextAuthRequest,
    { params }: { params: Promise<{ deckId: string }> }
) {
    if (!req.auth) {
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        )
    }
    try {
        const { deckId } = await params
        const body = await req.json()
            .then(obj => FlashcardHandleSchema.safeParse(obj))

        if (!body.success) {
            console.error(`Wrong data provided: ${body.error}`)
            return NextResponse.json(
                { message: 'Wrong data provided' },
                { status: 400 }
            )
        }

        const flashcards = await prisma.flashcard.findMany({
            where: { deckId: deckId }
        })
        flashcards.sort((lhs, rhs) => rhs.flashcardNum - lhs.flashcardNum)
        const availableIndex: number = (flashcards.length === 0) ? 0 : (flashcards[0].flashcardNum + 1)

        const newCard = await prisma.flashcard.create({
            data: {
                flashcardNum: availableIndex,
                deckId: deckId as string,
                frontText: body.data.frontText as string,
                backText: body.data.backText as string
            }
        })
        return NextResponse.json(newCard)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
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
            { message: 'Not authenticated' },
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
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})


