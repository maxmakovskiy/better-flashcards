import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'

export type EnhancedDeckModel = DeckModel & { flashcards: FlashcardModel[] }

