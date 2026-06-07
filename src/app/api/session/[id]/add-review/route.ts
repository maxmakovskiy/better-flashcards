import { NextResponse } from 'next/server'
import { NextAuthRequest } from 'next-auth'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import * as z from 'zod'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import { LearningStateSchema } from '@/app/flashcards/types'

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
        const sessionId = await params.then(({ id }) => z.cuid2().parse(id))

        const {
            deckId,
            flashcardNum,
            stability,
            difficulty,
            elapsedDays,
            scheduledDays,
            learningSteps,
            reps,
            lapses,
            learningState,
            nextReviewAt,
            lastReviewAt,
            lastDueData,
            responseTimeMs,
            isCorrect
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
                nextReviewAt: nextReviewAt,
                lastReviewAt: lastReviewAt,
                stability: stability,
                difficulty: difficulty,
                elapsedDays: elapsedDays,
                scheduledDays: scheduledDays,
                learningSteps: learningSteps,
                reps: reps,
                lapses: lapses,
                learningState: LearningStateSchema.parse(learningState)
            }
        })

        await prisma.reviewHistory.create({
            data: {
                sessionId: sessionId,
                flashcardNum: flashcardNum,
                deckId: deckId,
                learningState: LearningStateSchema.parse(learningState),
                dueData: lastDueData,
                stability: stability,
                difficulty: difficulty,
                responseTimeMs: responseTimeMs,
                isCorrect: isCorrect,
                reviewedAt: lastReviewAt,
                scheduledDays: scheduledDays,
                learningSteps: learningSteps
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


