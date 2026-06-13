import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { EnhancedDeckModel } from '@/app/flashcards/types'
import { DeckHandleSchema } from '@/app/flashcards/_schemas/deck-handle-schema'

// endpoint to create new deck
export const POST = auth(async function POST(req) {
    if (!req.auth) {
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const body = await req.json()
            .then(obj => DeckHandleSchema.safeParse(obj))

        if (!body.success) {
            console.error(`Wrong data provided: ${body.error}`)
            return NextResponse.json(
                { message: 'Wrong data provided' },
                { status: 400 }
            )
        }

        const newDeck = await prisma.deck.create({
            data: {
                title: body.data.title as string,
                description: body.data.description as string,
                userId: req.auth.user?.id as string
            },
            include: { flashcards: true }
        })
        return NextResponse.json(newDeck)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json(
            { message: 'Not authenticated' },
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
        return NextResponse.json(allDecks)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})


