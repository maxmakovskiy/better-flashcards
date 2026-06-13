import { NextResponse } from 'next/server'
import { NextAuthRequest } from 'next-auth'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import { StudySessionStatusEnum } from '@/../prisma/generated/prisma/enums'
import * as z from 'zod'

// end point to create new study session connected to specific deck
export const POST = auth(async function POST(req: NextAuthRequest) {
    if (!req.auth) {
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        )
    }
    try {
        const { deckId } = await req.json()
            .then(obj => z.object({ deckId: z.cuid2() }).parse(obj))
        const session: StudySessionModel = await prisma.studySession.create({
            data: {
                deckId: deckId,
                status: StudySessionStatusEnum.STARTED
            },
        })
        return NextResponse.json(session)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})


