import { z } from 'zod'
import { DifficultyRatingSchema } from './difficulty-rating-schema'
import { FlashcardsLearningStateSchema } from './flashcards-learning-state-schema'

export const ReviewHistorySchema = z.object({
    sessionId: z.string(),
    flashcardNum: z.number(),
    deckId: z.string(),
    learningState: FlashcardsLearningStateSchema,
    dueData: z.coerce.date(),
    stability: z.number(),
    difficulty: z.number(),
    responseTimeMs: z.number(),
    isCorrect: z.boolean(),
    reviewedAt: z.coerce.date(),
    scheduledDays: z.number(),
    learningSteps: z.number(),
    rating: DifficultyRatingSchema
})
