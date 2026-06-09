import { z } from 'zod'
import { EnhancedStudySessionSchema } from './types/study-session-schema'

export const ServerAnalyticsSchema = z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date(),
})

export type ServerAnalyticsSchema = z.infer<typeof ServerAnalyticsSchema>

export const ClientAnalyticsSchema = z.object({
    numDeckAdded: z.number(),
    numCardsAdded: z.number(),
    studyTimeMs: z.number(),
    studySessions: z.array(EnhancedStudySessionSchema),
})

export type ClientAnalyticsSchema = z.infer<typeof ClientAnalyticsSchema>

