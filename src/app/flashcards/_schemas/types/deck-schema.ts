import * as z from 'zod'
import { FlashcardArraySchema } from './flashcard-schema'
import { StudySessionArraySchema } from './study-session-schema'
import { DeckSchema } from './basic-deck-schema'

export const EnhancedFlashcardsDeckSchema = DeckSchema.extend({
    flashcards: FlashcardArraySchema
})
export const EnhancedFlashcardsDeckArraySchema = z.array(EnhancedFlashcardsDeckSchema)


export const EnhancedStudyDeckSchema = DeckSchema.extend({
    flashcards: FlashcardArraySchema,
    studySessions: StudySessionArraySchema,
})
export const EnhancedStudyDeckArraySchema = z.array(EnhancedStudyDeckSchema)
