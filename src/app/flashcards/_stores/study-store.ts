import { createStore } from 'zustand/vanilla'
import {
    EnhancedStudyDeckModel,
    mapFlashcardToFsrs
} from '@/app/flashcards/types'
import { EnhancedStudyDeckArraySchema } from '@/app/flashcards/_schemas/types/deck-schema'
import { StudySessionSchema } from '@/app/flashcards/_schemas/types/study-session-schema'
import { StudySessionActionsSchema } from '@/app/flashcards/_schemas/types/study-sesssion-actions-schema'
import { LearningStateFromFsrsSchema } from '@/app/flashcards/_schemas/types/flashcards-learning-state-schema'
import { DifficultyRatingFromFsrsSchema } from '@/app/flashcards/_schemas/types/difficulty-rating-from-fsrs-schema'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { Grade, fsrs, FSRS, Rating } from 'ts-fsrs'
import { StreakSchema } from '@/app/flashcards/_schemas/streak-schema'

export type StudySession = {
    session: StudySessionModel | null
    scheduler: FSRS
    decks: EnhancedStudyDeckModel[] | null
    cards: FlashcardModel[] | null
    selectedDeck: EnhancedStudyDeckModel | null
    // Statistics
    isCurrentCardAnswered: boolean
    reviewedCount: number
    correctCount: number
    timerTimestamp: Date | null
    numOfCardsToReview: number
    numOfCardsLearned: number
    daysStreak: number | null
    // loading state
    isSessionCreating: boolean
    isSessionError: boolean
}

export type StudyStoreAction = {
    startSession: () => void
    completeSession: () => void
    selectDeck: (deckId: string) => void
    loadDecks: () => void
    answerCard: (grade: Grade) => void
    revealCard: () => void
}

export type StudyStore = StudySession & StudyStoreAction

export const defaultInitState: StudySession = {
    session: null,
    decks: null,
    cards: null,
    scheduler: fsrs(),
    selectedDeck: null,
    isCurrentCardAnswered: false,
    reviewedCount: 0,
    correctCount: 0,
    timerTimestamp: null,
    numOfCardsToReview: 0,
    numOfCardsLearned: 0,
    daysStreak: null,
    isSessionCreating: false,
    isSessionError: false
}

export const createStudyStore = (
    initState: StudySession = defaultInitState,
) => {
    return createStore<StudyStore>()((set, get) => ({
        ...initState,
        startSession: async () => {
            const { selectedDeck } = get()
            set({
                isSessionCreating: true
            })
            try {
                const session = await fetch(
                    '/api/session/start',
                    {
                        method: 'POST',
                        body: JSON.stringify({ deckId: selectedDeck?.deckId }),
                    }).then(res => {
                        if (!res.ok) {
                            throw new Error(`Failed to create new session for deck with id=${selectedDeck?.deckId}`)
                        }
                        return res.json()
                    }).then(s => {
                        const data = StudySessionSchema.safeParse(s)
                        if (!data.success) {
                            set({
                                isSessionError: true
                            })
                            throw new Error(`Failed to parse study session received from server: ${data.error}`)
                        }
                        return data.data
                    })
                set({
                    session: session,
                    timerTimestamp: new Date(),
                    isSessionCreating: false
                })
            } catch (e) {
                console.log(e)
            }
        },
        selectDeck: (deckId: string) => {
            const { decks } = get()
            const deck = decks?.find(d => d.deckId === deckId)
            const now = new Date()

            if (!deck) {
                return
            }

            if (deck.studySessions.length !== 0) {
                console.log(`Session exist on deck (deckId=${deck.deckId}): ${JSON.stringify(deck.studySessions[0])}`)
                set({
                    session: deck.studySessions[0],
                    timerTimestamp: new Date(),
                })
            } else {
                set({
                    session: null
                })
            }

            set({
                selectedDeck: deck,
                reviewedCount: deck?.flashcards.filter((c: FlashcardModel) => c.nextReviewAt > now).length,
                cards: deck?.flashcards.filter(c => !(c.nextReviewAt > now) || !c.lastReviewAt),
                isCurrentCardAnswered: false
            })
        },
        answerCard: (grade: Grade) => {
            const {
                session,
                selectedDeck,
                cards,
                completeSession,
                timerTimestamp,
                reviewedCount,
                scheduler
            } = get()

            if (!cards || cards.length === 0) {
                return
            }

            const topCard = cards[0]
            console.log(`answering card (flashcardNum=${topCard?.flashcardNum}; deckId=${selectedDeck?.deckId}): ${grade}`)

            const now = new Date()
            const updatedFsrsCard = scheduler.next(
                mapFlashcardToFsrs(topCard), now, grade)

            const diffMs: number = now.getTime() - timerTimestamp!.getTime()
            set({
                timerTimestamp: now
            })

            const body = {
                deckId: selectedDeck!.deckId,
                flashcardNum: topCard!.flashcardNum,
                stability: updatedFsrsCard.card.stability,
                difficulty: updatedFsrsCard.card.difficulty,
                elapsedDays: updatedFsrsCard.card.elapsed_days,
                scheduledDays: updatedFsrsCard.card.scheduled_days,
                learningSteps: updatedFsrsCard.card.learning_steps,
                reps: updatedFsrsCard.card.reps,
                lapses: updatedFsrsCard.card.lapses,
                learningState: LearningStateFromFsrsSchema.parse(updatedFsrsCard.log.state),
                nextReviewAt: updatedFsrsCard.card.due,
                lastReviewAt: now,
                lastDueData: updatedFsrsCard.log.due,
                responseTimeMs: diffMs,
                isCorrect: (grade === Rating.Good) || (grade === Rating.Easy),
                difficultyRating: DifficultyRatingFromFsrsSchema.parse(updatedFsrsCard.log.rating)
            }

            fetch(`/api/session/${session?.sessionId}/add-review`,
                { method: 'POST', body: JSON.stringify(body) })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Failed to create review-history for flashcard (flashcardNum=${topCard?.flashcardNum}; deckId=${selectedDeck?.deckId}`)
                    }
                }).then(() => {
                    set({
                        reviewedCount: reviewedCount + 1
                    })
                }).catch(e => console.log(e))

            const updatedCards = cards?.splice(1)
            set({
                cards: updatedCards,
                isCurrentCardAnswered: false,
            })

            if (updatedCards.length === 0) {
                console.log('Finishing session automatically because no cards left to review')
                completeSession()
            }
        },

        revealCard: () => {
            set({
                isCurrentCardAnswered: true,
            })
        },
        loadDecks: async () => {
            try {
                const decks: EnhancedStudyDeckModel[] = await fetch('/api/session/decks')
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to fetch the decks to review')
                        }
                        return res.json()
                    }).then(decks => {
                    return EnhancedStudyDeckArraySchema.parse(decks)
                })

                const streak = await fetch('/api/session/streak')
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to fetch the streak')
                        }
                        return res.json()
                    }).then(obj => StreakSchema.parse(obj).streak)
                set({
                    daysStreak: streak
                })

                const now = new Date()
                let learned = 0
                const numOfCardsToReview = decks
                    .map(d => {
                        const toLearn = d.flashcards.filter(card => !(card.nextReviewAt > now)).length
                        learned += d.flashcards.length - toLearn
                        return toLearn
                    })
                    .reduce((a, b) => a + b, 0)

                set({
                    decks: decks,
                    numOfCardsToReview: numOfCardsToReview,
                    numOfCardsLearned: learned
                })
            } catch(e) {
                console.error(e)
            }
        },

        completeSession: async () => {
            const { loadDecks, session } = get()
            try {
                await fetch(
                    `/api/session/${session?.sessionId}/finish`,
                    { method: 'POST' }
                ).then(res => {
                    if (!res.ok) {
                        throw new Error(`Failed to finish the session with id=${session?.sessionId}`)
                    }
                    return res.json()
                })
                set({
                    session: null,
                    selectedDeck: null
                })
                loadDecks()
            } catch (e) {
                console.log(e)
            }
        },

    }))
}

