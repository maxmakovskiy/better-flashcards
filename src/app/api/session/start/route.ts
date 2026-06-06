import { NextResponse } from 'next/server'
import { NextAuthRequest } from 'next-auth'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'

// end point to create new study session connected to specific deck
export const POST = auth(async function POST(req: NextAuthRequest) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }
    try {
        const { deckId } = await req.json()
        const session: StudySessionModel = await prisma.studySession.create({
            data: {
                deckId: deckId
            },
        })
        return NextResponse.json(session)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})


