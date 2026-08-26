import { z } from 'zod'
import { ReviewHistorySchema } from './review-history-schema'
import { DeckSchema } from './basic-deck-schema'

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

export const StudySessionArraySchema = z.array(StudySessionSchema)

export const EnhancedStudySessionSchema = StudySessionSchema.extend({
    reviewedCards: z.array(ReviewHistorySchema),
    deck: DeckSchema,
})

