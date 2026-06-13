import { z } from 'zod'

export const DeckHandleSchema = z.object({
    title: z.string(),
    description: z.string()
})

export type DeckHandleSchema = z.infer<typeof DeckHandleSchema>
