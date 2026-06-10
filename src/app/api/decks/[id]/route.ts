import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { NextResponse } from 'next/server'
import { NextAuthRequest } from 'next-auth'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'

// return the deck
export const GET = auth(async function GET(
    req: NextAuthRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!req.auth) {
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        )
    }
    try {
        const { id } = await params
        const deck = await prisma.deck.findUniqueOrThrow({
            where: { deckId: id }
        })
        return NextResponse.json(deck)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})

export const DELETE = auth(async function DELETE(
    req: NextAuthRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!req.auth) {
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const { id } = await params
        await prisma.deck.delete({
            where: {
                deckId: id,
                userId: req.auth.user?.id as string
            }
        })
        return new Response('Deleted!', { status: 200 })
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})

export const POST = auth(async function POST(
    req: NextAuthRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!req.auth) {
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const { id } = await params
        const { title, description } = await req.json()
        const updatedDeck: DeckModel = await prisma.deck.update({
            where: {
                deckId: id,
                userId: req.auth.user?.id as string
            },
            data: {
                title: title as string,
                description: description as string,
            },
        })
        return NextResponse.json(updatedDeck)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})
