import { auth } from "@/auth"
import { prisma } from '@/prisma'
import { NextResponse } from "next/server"
import { NextAuthRequest } from 'next-auth'

// endpoint to create new card
export const DELETE = auth(async function DELETE(
    req: NextAuthRequest,
    { params }: { params: Promise<{ deckId: string, flashcardNum: number }> }
) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
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
            { message: "Something went wrong" },
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
            { message: "Not authenticated" },
            { status: 401 }
        )
    }
    try {
        const { deckId, flashcardNum } = await params
        const { frontText, backText } = await req.json()

        console.log(`Server: Updating flashcard ${flashcardNum} at deck ${deckId} with new values (front=${frontText} | back=${backText})`)

        const updatedCard = await prisma.flashcard.update({
            where: {
                flashcardNum_deckId: {
                    flashcardNum: Number(flashcardNum),
                    deckId: deckId
                }
            },
            data: {
                frontText: frontText,
                backText: backText
            }
        })
        console.log(`Server: flashcard(flashcardNum=${flashcardNum},deckId=${deckId}) updated successfully: new values are (front=${updatedCard.frontText} | back=${updatedCard.backText})`)
        return NextResponse.json(updatedCard)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})

