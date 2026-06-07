import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import { LearningStateEnum, StudySessionStatusEnum, DifficultyRatingEnum } from '@/../prisma/generated/prisma/enums'
import * as z from 'zod'
import { createEmptyCard, Card, fsrs, FSRS, Rating, State } from 'ts-fsrs'

export type EnhancedDeckModel = DeckModel & { flashcards: FlashcardModel[] }
export type EnhancedStudyDeckModel = DeckModel & { flashcards: FlashcardModel[], studySessions: StudySessionModel[] }
export type EnhancedStudySessionModel = StudySessionModel & { deck: EnhancedDeckModel }

// export const LearningStateSchema = z.custom<LearningStateEnum>((val: unknown) => z.enum(LearningStateEnum).parse(val))
export const LearningStateSchema = z.enum(LearningStateEnum)
export const StudySessionStatusSchema = z.enum(StudySessionStatusEnum)
export const DifficultyRatingSchema = z.enum(DifficultyRatingEnum)
export const StudySessionActionsSchema = z.enum(['PAUSE', 'RESUME', 'FINISH'])
export type StudySessionActionsSchema = z.infer<typeof StudySessionActionsSchema>

export const FlashcardSchema = z.object({
    flashcardNum: z.number(),
    deckId: z.string(),
    frontText: z.string(),
    backText: z.string(),

    stability: z.number(),
    difficulty: z.number(),
    scheduledDays: z.number(),
    elapsedDays: z.number(),
    learningSteps: z.number(),
    reps: z.number(),
    lapses: z.number(),
    learningState: LearningStateSchema,

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

export const TagSchema = z.object({
    name: z.string(),
    description: z.string().nullable()
})

export const StudySessionSchema = z.object({
    sessionId: z.string(),
    startedAt: z.coerce.date(),
    endedAt: z.coerce.date().nullable(),
    status: StudySessionStatusSchema,
    totalReviews: z.number(),
    correctAnswers: z.number(),
    avgResponseTimeMs: z.number().nullable(),
    deckId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export const StudySessionArraySchema = z.array(StudySessionSchema)

const ReviewHistory = z.object({
    sessionId: z.string(),
    flashcardNum: z.number(),
    deckId: z.string(),
    difficultyRating: DifficultyRatingSchema,
    learningState: LearningStateSchema,
    dueData: z.coerce.date(),
    stability: z.number(),
    difficulty: z.number(),
    responseTimeMs: z.number(),
    isCorrect: z.boolean(),
    reviewedAt: z.coerce.date(),
    scheduledDays: z.number(),
    learningSteps: z.number()
})

export const DeckSchema = z.object({
    deckId: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    userId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export const EnhancedStudyDeckSchema = z.object({
    deckId: z.string(),
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    flashcards: FlashcardArraySchema,
    studySessions: StudySessionArraySchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})

export const EnhancedStudyDeckArraySchema = z.array(EnhancedStudyDeckSchema)

const fsrsLearningStateSchema = z.enum(LearningStateEnum).transform(state => {
    switch(state) {
        case LearningStateEnum.NEW:
            return State.New
        case LearningStateEnum.LEARNING:
            return State.Learning
        case LearningStateEnum.REVIEW:
            return State.Review
        case LearningStateEnum.RELEARNING:
            return State.Relearning
    }
})

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
        state: fsrsLearningStateSchema.parse(flashcard.learningState)
    }
}

export function mapFsrsToFlashcard(card: Card) {
    return {
        nextReviewAt: card.due,
        stability: card.stability,
        difficulty: card.difficulty,
        elapsedDays: card.elapsed_days,
        scheduledDays: card.scheduled_days,
        learningSteps: card.learning_steps,
        reps: card.reps,
        lapses: card.lapses,
        state: card.state
    }
}

