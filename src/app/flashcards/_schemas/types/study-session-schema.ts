import { z } from 'zod'
import { StudySessionStatusEnum } from '@/../prisma/generated/prisma/enums'
import { ReviewHistorySchema } from './review-history-schema'

export const StudySessionStatusSchema = z.enum(StudySessionStatusEnum)

export const StudySessionSchema = z.object({
    sessionId: z.string(),
    startedAt: z.coerce.date(),
    endedAt: z.coerce.date().nullable(),
    status: StudySessionStatusSchema,
    totalReviews: z.number(),
    correctAnswers: z.number(),
    avgResponseTimeMs: z.number().nullable(),
    deckId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export const StudySessionArraySchema = z.array(StudySessionSchema)

export const EnhancedStudySessionSchema = StudySessionSchema.extend({
    reviewedCards: z.array(ReviewHistorySchema)
})

