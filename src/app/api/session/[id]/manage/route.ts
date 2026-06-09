import { NextResponse } from 'next/server'
import { NextAuthRequest } from 'next-auth'
import * as z from 'zod'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { StudySessionStatusEnum } from '@/../prisma/generated/prisma/enums'
import { StudySessionActionsSchema } from '@/app/flashcards/_schemas/types/study-sesssion-actions-schema'

// end point to create new study session connected to specific deck
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
        const action = await req.json()
            .then(({ action }) => StudySessionActionsSchema.parse(action))

        if (action === StudySessionActionsSchema.enum.RESUME) {
            const session = await prisma.studySession.update({
                where: {
                    sessionId: z.cuid2().parse(id)
                },
                data: {
                    status: StudySessionStatusEnum.STARTED,
                }
            })
            return NextResponse.json(session)
        } else {
            const reviews = await prisma.reviewHistory.findMany({
                where: {
                    sessionId: z.cuid2().parse(id)
                }
            })
            const statusToAssign = ((action === StudySessionActionsSchema.enum.PAUSE)
                ? StudySessionStatusEnum.PAUSED : StudySessionStatusEnum.FINISHED)
            const session = await prisma.studySession.update({
                where: {
                    sessionId: z.cuid2().parse(id)
                },
                data: {
                    endedAt: new Date(),
                    status: statusToAssign,
                    totalReviews: reviews.length,
                    correctAnswers: reviews
                        .map(r => Number(r.isCorrect))
                        .reduce((a, b) => (a + b), 0),
                    avgResponseTimeMs: reviews
                        .map(r => r.responseTimeMs)
                        .reduce((a, b) => (a + b), 0) / reviews.length
                }
            })
            return NextResponse.json(session)
        }
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})


