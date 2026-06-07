import { NextResponse } from "next/server"
import { NextAuthRequest } from 'next-auth'
import { auth } from "@/auth"
import { prisma } from '@/prisma'
import { StudySessionModel } from "@/../prisma/generated/prisma/models/StudySession"

// end point to create new study session connected to specific deck
export const POST = auth(async function POST(
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
        const reviews = await prisma.reviewHistory.findMany({
            where: {
                sessionId: id
            }
        })
        await prisma.studySession.update({
            where: {
                sessionId: id
            },
            data: {
                endedAt: new Date(),
                totalReviews: reviews.length,
                correctAnswers: reviews
                    .map(r => Number(r.isCorrect))
                    .reduce((a, b) => (a + b), 0),
                avgResponseTimeMs: reviews
                    .map(r => r.responseTimeMs)
                    .reduce((a, b) => (a + b), 0) / reviews.length
            }
        })
        return new Response('Finished!', { status: 200 })
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})


