import { z } from 'zod'

export const FlashcardHandleSchema = z.object({
    frontText: z.string(),
    backText: z.string(),
})

export type FlashcardCreationSchema = z.infer<typeof FlashcardHandleSchema>
