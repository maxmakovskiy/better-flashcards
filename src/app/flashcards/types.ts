import { Card } from 'ts-fsrs'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import { ReviewHistoryModel } from '@/../prisma/generated/prisma/models/ReviewHistory'
import { FsrsLearningStateSchema } from './_schemas/types/fsrs-learning-state-schema'

export type EnhancedDeckModel = DeckModel & { flashcards: FlashcardModel[] }
export type EnhancedStudyDeckModel = DeckModel & { flashcards: FlashcardModel[], studySessions: StudySessionModel[] }
export type EnhancedStudySessionModel = StudySessionModel & { reviewedCards: ReviewHistoryModel[] }

export function mapFlashcardToFsrs(
    flashcard: FlashcardModel
): Card {
    return {
        due: flashcard.nextReviewAt,
        stability: flashcard.stability,
        difficulty: flashcard.difficulty,
        scheduled_days: flashcard.scheduledDays,
        learning_steps: flashcard.learningSteps,
        elapsed_days: flashcard.elapsedDays,
        reps: flashcard.reps,
        lapses: flashcard.lapses,
        state: FsrsLearningStateSchema.parse(flashcard.learningState)
    }
}

