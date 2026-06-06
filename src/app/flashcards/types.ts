import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import * as z from 'zod'

export type EnhancedDeckModel = DeckModel & { flashcards: FlashcardModel[] }
export type EnhancedStudySessionModel = StudySessionModel & { deck: EnhancedDeckModel }

export const FlashcardSchema = z.object({
    flashcardNum: z.number(),
    deckId: z.string(),
    frontText: z.string(),
    backText: z.string(),
    easeFactor: z.number(),
    intervalDays: z.number(),
    repetitionCount: z.number(),
    nextReviewAt: z.coerce.date(),
    lastReviewAt: z.coerce.date().nullable(),
    memoryStrength: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export const FlashcardArraySchema = z.array(FlashcardSchema)

export const EnhancedDeckSchema = z.object({
    deckId: z.string(),
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    flashcards: FlashcardArraySchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export const EnhancedDeckArraySchema = z.array(EnhancedDeckSchema)

