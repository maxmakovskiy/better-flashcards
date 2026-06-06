import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'

export type EnhancedDeckModel = DeckModel & { flashcards: FlashcardModel[] }
export type EnhancedStudySessionModel = StudySessionModel & { deck: EnhancedDeckModel }
