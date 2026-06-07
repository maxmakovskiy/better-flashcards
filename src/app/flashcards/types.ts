import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import * as z from 'zod'

export type EnhancedDeckModel = DeckModel & { flashcards: FlashcardModel[] }
export type EnhancedStudySessionModel = StudySessionModel & { deck: EnhancedDeckModel }

export const FlashcardSchema = z.object({
    flashcardNum: z.number(),
    deckId: z.string(),
    frontText: z.string(),
    backText: z.string(),

    stability: z.number(),
    difficulty: z.number(),
    scheduledDays: z.number(),
    learningSteps: z.number(),
    reps: z.number(),
    lapses: z.number(),
    learningState: z.string(),

    nextReviewAt: z.coerce.date(),
    lastReviewAt: z.coerce.date().nullable(),
    memoryStrength: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export const FlashcardArraySchema = z.array(FlashcardSchema)

export const EnhancedDeckSchema = z.object({
    deckId: z.string(),
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    flashcards: FlashcardArraySchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export const EnhancedDeckArraySchema = z.array(EnhancedDeckSchema)

export const TagSchema = z.object({
    name: z.string(),
    description: z.string().nullable()
})

export const StudySessionSchema = z.object({
    sessionId: z.string(),
    startedAt: z.coerce.date(),
    endedAt: z.coerce.date().nullable(),
    totalReviews: z.number(),
    correctAnswers: z.number(),
    avgResponseTimeMs: z.number().nullable(),
    deckId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

const ReviewHistory = z.object({
    sessionId: z.string(),
    flashcardNum: z.number(),
    deckId: z.string(),
    difficultyRating: z.string(),
    learningState: z.string(),
    dueData: z.coerce.date(),
    stability: z.number(),
    difficulty: z.number(),
    responseTimeMs: z.number(),
    isCorrect: z.boolean(),
    reviewedAt: z.coerce.date(),
    scheduledDays: z.number(),
    learningSteps: z.number()
})

export const DeckSchema = z.object({
    deckId: z.string(),
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})


