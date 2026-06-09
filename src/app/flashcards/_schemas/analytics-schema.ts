import { z } from 'zod'
import { Duration } from 'date-fns'
import { EnhancedStudySessionSchema } from './types/study-session-schema'

export const ServerAnalyticsSchema = z.object({
    startDate: z.coerce.date().nullable(),
    endDate: z.coerce.date().nullable(),
})

export const ClientAnalyticsSchema = z.object({
    numDeckAdded: z.number(),
    numCardsAdded: z.number(),
    studyTime: z.custom<Duration>,
    studySessions: z.array(EnhancedStudySessionSchema),
})


