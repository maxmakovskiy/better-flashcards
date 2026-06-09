import * as z from 'zod'

export const TagSchema = z.object({
    name: z.string(),
    description: z.string().nullable()
})
