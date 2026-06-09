import * as z from 'zod'
import { FlashcardArraySchema } from './flashcard-schema'
import { StudySessionArraySchema } from './study-session-schema'

export const DeckSchema = z.object({
    deckId: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    userId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export const EnhancedFlashcardsDeckSchema = DeckSchema.extend({
    flashcards: FlashcardArraySchema
})
export const EnhancedFlashcardsDeckArraySchema = z.array(EnhancedFlashcardsDeckSchema)


export const EnhancedStudyDeckSchema = DeckSchema.extend({
    flashcards: FlashcardArraySchema,
    studySessions: StudySessionArraySchema,
})
export const EnhancedStudyDeckArraySchema = z.array(EnhancedStudyDeckSchema)
