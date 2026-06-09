import * as z from 'zod'
import { FlashcardsLearningStateSchema } from './flashcards-learning-state-schema'

export const FlashcardSchema = z.object({
    flashcardNum: z.number(),
    deckId: z.string(),
    frontText: z.string(),
    backText: z.string(),

    stability: z.number(),
    difficulty: z.number(),
    scheduledDays: z.number(),
    elapsedDays: z.number(),
    learningSteps: z.number(),
    reps: z.number(),
    lapses: z.number(),
    learningState: FlashcardsLearningStateSchema,

    nextReviewAt: z.coerce.date(),
    lastReviewAt: z.coerce.date().nullable(),
    memoryStrength: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export const FlashcardArraySchema = z.array(FlashcardSchema)
