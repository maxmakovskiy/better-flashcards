import { auth } from "@/auth"
import { prisma } from '@/prisma'
import { NextResponse } from "next/server"
import { NextAuthRequest } from 'next-auth'

// return the deck
export const GET = auth(async function GET(
    req: NextAuthRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
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
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})



