import { z } from 'zod'

import { FlashcardsLearningStateSchema } from './types/flashcards-learning-state-schema'
import { DifficultyRatingSchema } from './types/difficulty-rating-schema'

export const AddReviewCreateSchema = z.object({
    deckId: z.cuid2(),
    flashcardNum: z.number(),
    stability: z.number(),
    difficulty: z.number(),
    elapsedDays: z.number(),
    scheduledDays: z.number(),
    learningSteps: z.number(),
    reps: z.number(),
    lapses: z.number(),
    learningState: FlashcardsLearningStateSchema,
    nextReviewAt: z.coerce.date(),
    lastReviewAt: z.coerce.date(),
    lastDueData: z.coerce.date(),
    responseTimeMs: z.number(),
    isCorrect: z.boolean(),
    difficultyRating: DifficultyRatingSchema
})

export type AddReviewHandleSchema = z.infer<typeof AddReviewCreateSchema>

