import * as z from 'zod'

export const DeckSchema = z.object({
    deckId: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    userId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})