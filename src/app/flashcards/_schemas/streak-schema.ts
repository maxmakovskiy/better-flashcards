import { z } from 'zod'

export const StreakSchema = z.object({
    streak: z.number()
})

export type StreakSchema = z.infer<typeof StreakSchema>
