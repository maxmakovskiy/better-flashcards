import { z } from 'zod'
import { EnhancedStudySessionSchema } from './types/study-session-schema'

export const ServerAnalyticsSchema = z.object({
    startDate: z.coerce.date().nullish(),
    endDate: z.coerce.date(),
})

export const ClientAnalyticsSchema = z.object({
    numDeckAdded: z.number(),
    numCardsAdded: z.number(),
    studyTimeMs: z.number(),
    studySessions: z.array(EnhancedStudySessionSchema),
})


