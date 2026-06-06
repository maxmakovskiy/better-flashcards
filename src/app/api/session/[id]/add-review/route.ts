import { NextResponse } from 'next/server'
import { NextAuthRequest } from 'next-auth'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'

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
        const { id: sessionId } = await params
        const {
            deckId,
            flashcardNum,
            easeFactor,
            intervalDays,
            repetitionCount,
            nextReviewAt,
            lastReviewAt,
            difficultyRating,
            responseTimeMs,
            isCorrect,
            reviewedAt
        } = await req.json()

        // check if session exist and haven't been ended
        const session: StudySessionModel = await prisma.studySession.findUniqueOrThrow({
            where: { sessionId: sessionId }
        })

        if (session.endedAt !== null) {
            throw new Error(`The study session with id=${sessionId} has already been ended`)
        }

        // update the card
        await prisma.flashcard.update({
            where: {
                flashcardNum_deckId: {
                    flashcardNum: flashcardNum,
                    deckId: deckId
                }
            },
            data: {
                easeFactor: easeFactor,
                intervalDays: intervalDays,
                repetitionCount: repetitionCount,
                nextReviewAt: nextReviewAt,
                lastReviewAt: lastReviewAt
            }
        })

        await prisma.reviewHistory.create({
            data: {
                sessionId: sessionId,
                flashcardNum: flashcardNum,
                deckId: deckId,
                difficultyRating: difficultyRating,
                responseTimeMs: responseTimeMs,
                isCorrect: isCorrect,
                reviewedAt: reviewedAt,
            }
        })

        return new Response('Added!', { status: 200 })
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})


