import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { NextResponse } from 'next/server'
import { NextAuthRequest } from 'next-auth'
import { FlashcardHandleSchema } from '@/app/flashcards/_schemas/flashcard-handle-schema'

// endpoint to delete a card inside a deck
export const DELETE = auth(async function DELETE(
    req: NextAuthRequest,
    { params }: { params: Promise<{ deckId: string, flashcardNum: number }> }
) {
    if (!req.auth) {
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        )
    }
    try {
        const { deckId, flashcardNum } = await params
        await prisma.flashcard.delete({
            where: {
                flashcardNum_deckId: {
                    flashcardNum: Number(flashcardNum),
                    deckId: deckId
                }
            }
        })
        const deck = await prisma.deck.findUniqueOrThrow({
            where: {
                deckId: deckId
            },
            include: {
                flashcards: true
            }
        })
        return NextResponse.json(deck.flashcards)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})


export const PUT = auth(async function PUT(
    req: NextAuthRequest,
    { params }: { params: Promise<{ deckId: string, flashcardNum: number }> }
) {
    if (!req.auth) {
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        )
    }
    try {
        const { deckId, flashcardNum } = await params
        const body = await req.json()
            .then(obj => FlashcardHandleSchema.safeParse(obj))

        if (!body.success) {
            console.error(`Wrong data provided: ${body.error}`)
            return NextResponse.json(
                { message: 'Wrong data provided' },
                { status: 400 }
            )
        }

        const updatedCard = await prisma.flashcard.update({
            where: {
                flashcardNum_deckId: {
                    flashcardNum: Number(flashcardNum),
                    deckId: deckId
                }
            },
            data: {
                frontText: body.data.frontText,
                backText: body.data.backText
            }
        })
        return NextResponse.json(updatedCard)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})

