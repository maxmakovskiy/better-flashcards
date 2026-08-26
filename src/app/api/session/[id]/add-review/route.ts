import { NextResponse } from 'next/server'
import { NextAuthRequest } from 'next-auth'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import * as z from 'zod'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import { AddReviewCreateSchema } from '@/app/flashcards/_schemas/add-review-create-schema'

// end point to create new review history connected to specific study session
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
        const sessionId = await params.then(({ id }) => z.cuid2().parse(id))

        const body = await req.json().then(obj => AddReviewCreateSchema.safeParse(obj))

        if (!body.success) {
            console.error(`Wrong data provided: ${body.error}`)
            return NextResponse.json(
                { message: 'Wrong data provided' },
                { status: 400 }
            )
        }

        // check if session exist and haven't been ended
        const session: StudySessionModel = await prisma.studySession.findUniqueOrThrow({
            where: { sessionId: sessionId }
        })

        if (session.endedAt !== null) {
            throw new Error(`The study session with id=${sessionId} has already been ended`)
        }

        const review = await prisma.$transaction(async (tx) => {
            // update the card
            await tx.flashcard.update({
                where: {
                    flashcardNum_deckId: {
                        flashcardNum: body.data.flashcardNum,
                        deckId: body.data.deckId
                    }
                },
                data: {
                    nextReviewAt: body.data.nextReviewAt,
                    lastReviewAt: body.data.lastReviewAt,
                    stability: body.data.stability,
                    difficulty: body.data.difficulty,
                    elapsedDays: body.data.elapsedDays,
                    scheduledDays: body.data.scheduledDays,
                    learningSteps: body.data.learningSteps,
                    reps: body.data.reps,
                    lapses: body.data.lapses,
                    learningState: body.data.learningState
                }
            })

            return tx.reviewHistory.create({
                data: {
                    sessionId: sessionId,
                    flashcardNum: body.data.flashcardNum,
                    deckId: body.data.deckId,
                    learningState: body.data.learningState,
                    dueData: body.data.lastDueData,
                    stability: body.data.stability,
                    difficulty: body.data.difficulty,
                    responseTimeMs: body.data.responseTimeMs,
                    isCorrect: body.data.isCorrect,
                    reviewedAt: body.data.lastReviewAt,
                    scheduledDays: body.data.scheduledDays,
                    learningSteps: body.data.learningSteps,
                    rating: body.data.difficultyRating
                }
            })
        })

        return NextResponse.json(review)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})


