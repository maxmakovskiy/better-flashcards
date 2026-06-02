import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from '@/prisma'

// endpoint to create new deck
export const POST = auth(async function POST(req) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }

    try {
        // TODO: verify with Zod ?
        // https://zod.dev/api
        const { title, description } = await req.json()
        const newDeck = await prisma.deck.create({
            data: {
                title: title as string,
                description: description as string,
                userId: req.auth.user?.id as string
            }
        })
        return NextResponse.json(newDeck)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})
