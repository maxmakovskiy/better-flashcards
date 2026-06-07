import { createStore } from 'zustand/vanilla'
import {
    EnhancedStudyDeckModel,
    EnhancedStudyDeckArraySchema,
    StudySessionSchema,
    StudySessionActionsSchema
} from '@/app/flashcards/types'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import { FlashcardModel } from "@/../prisma/generated/prisma/models/Flashcard"
import { DifficultyRatingEnum } from "@/../prisma/generated/prisma/enums"
import dayjs from 'dayjs'

export type StudySession = {
    session: StudySessionModel | null
    decks: EnhancedStudyDeckModel[] | null
    cards: FlashcardModel[] | null
    selectedDeck: EnhancedStudyDeckModel | null
    // Statistics
    isCurrentCardAnswered: boolean
    reviewedCount: number
    correctCount: number
    timerTimestamp: Date | null
}

export type StudyStoreAction = {
    startSession: () => void
    pauseSession: () => void
    resumeSession: () => void
    completeSession: () => void
    manageSession: (desiredStatus: StudySessionActionsSchema) => Promise<StudySessionModel | undefined>
    selectDeck: (deckId: string) => void
    loadDecks: () => void
    answerCard: (grade: SuperMemoGrade) => void
    revealCard: () => void
}

export type StudyStore = StudySession & StudyStoreAction

export const defaultInitState: StudySession = {
    session: null,
    decks: null,
    cards: null,
    selectedDeck: null,
    isCurrentCardAnswered: false,
    reviewedCount: 0,
    correctCount: 0,
    timerTimestamp: null
}

export const createStudyStore = (
    initState: StudySession = defaultInitState,
) => {
    return createStore<StudyStore>()((set, get) => ({
        ...initState,
        startSession: async () => {
            const { selectedDeck } = get()
            try {
                const session: StudySessionModel = await fetch(
                    '/api/session/start',
                    {
                        method: 'POST',
                        body: JSON.stringify({ deckId: selectedDeck?.deckId }),
                    }).then(res => {
                        if (!res.ok) {
                            throw new Error(`Failed to create new session for deck with id=${selectedDeck?.deckId}`)
                        }
                        return res.json()
                    }).then(s => StudySessionSchema.parse(s))
                set({
                    session: session,
                    timerTimestamp: new Date()
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
                set({
                    session: deck.studySessions[0]
                })
            }

            set({
                selectedDeck: deck,
                reviewedCount: deck?.flashcards.filter((c: FlashcardModel) => c.nextReviewAt > now).length,
                cards: deck?.flashcards.filter(c => !(c.nextReviewAt > now) || !c.lastReviewAt)
            })
        },
        answerCard: (grade: SuperMemoGrade) => {
            const {
                session,
                selectedDeck,
                cards,
                completeSession,
                timerTimestamp,
                reviewedCount
            } = get()
            const topCard = cards?.at(0)
            console.log(`answering card (flashcardNum=${topCard?.flashcardNum}; deckId=${selectedDeck?.deckId}): ${grade}`)

            const { interval, repetition, efactor } = supermemo(
                {
                    interval: topCard!.intervalDays,
                    repetition: topCard!.repetitionCount,
                    efactor: topCard!.easeFactor
                }, grade);

            const now = new Date()
            const diffMs: number = now.getTime() - timerTimestamp!.getTime()
            set({
                timerTimestamp: now
            })

            const dueDate = dayjs(now).add(interval, 'day');

            const defineDifficulty = (grade: SuperMemoGrade) => (
                (grade > 4) ? DifficultyRatingEnum.PERFECT
                    : ((grade > 3) ? DifficultyRatingEnum.CORRECT_LITTLE_HESITATION
                        : ((grade > 2) ? DifficultyRatingEnum.CORRECT_BIG_HESITATION
                            : ((grade > 1) ? DifficultyRatingEnum.INCORRECT_EASY_RECALL
                                : ((grade > 0) ? DifficultyRatingEnum.INCORRECT_REMEMBERED
                                    : DifficultyRatingEnum.AGAIN)))))

            const body = {
                deckId: selectedDeck!.deckId,
                flashcardNum: topCard!.flashcardNum,
                easeFactor: efactor,
                intervalDays: interval,
                repetitionCount: repetition,
                nextReviewAt: dueDate,
                lastReviewAt: now,
                difficultyRating: defineDifficulty(grade),
                responseTimeMs: diffMs,
                isCorrect: grade >= 3,
                reviewedAt: now,
            }

            fetch(`/api/session/${session?.sessionId}/add-review`,
                { method: 'POST', body: JSON.stringify(body) })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Failed to create review-history for flashcard (flashcardNum=${topCard?.flashcardNum}; deckId=${selectedDeck?.deckId}`)
                    }
                }).catch(e => console.log(e))

            set({
                cards: cards?.splice(1),
                isCurrentCardAnswered: false,
                reviewedCount: reviewedCount + 1
            })

            if (cards?.length === 0) {
                console.log('Finishing session automatically because no cards left to review')
                completeSession()
            }
        },

        revealCard: () => {
            const { isCurrentCardAnswered } = get()
            set({
                isCurrentCardAnswered: !isCurrentCardAnswered,
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
                set({
                    decks: decks
                })
            } catch(e) {
                console.error(e)
            }
        },

        manageSession: async (desiredStatus: StudySessionActionsSchema) => {
            const { session } = get()
            try {
                const updatedSession: StudySessionModel = await fetch(
                    `/api/session/${session?.sessionId}/manage`,
                    {
                        method: 'POST',
                        body: JSON.stringify({ action: desiredStatus })
                    }
                ).then(res => {
                    if (!res.ok) {
                        throw new Error(`Failed to manage the session with id=${session?.sessionId} and action to execute=${desiredStatus}`)
                    }
                    return res.json()
                }).then(s => StudySessionSchema.parse(s))
                return updatedSession
            } catch (e) {
                console.log(e)
            }
        },
        pauseSession: async () => {
            const { loadDecks, manageSession } = get()
            const session = await manageSession(StudySessionActionsSchema.enum.PAUSE)
            set({
                session: session
            })
            loadDecks()
            console.log('Successfully paused the session')
        },
        completeSession: async () => {
            const { loadDecks, manageSession } = get()
            const session = await manageSession(StudySessionActionsSchema.enum.FINISH)
            set({
                session: session
            })
            loadDecks()
            console.log('Successfully finished the session')
        },
        resumeSession: async () => {
            const { manageSession } = get()
            const session = await manageSession(StudySessionActionsSchema.enum.FINISH)
            set({
                session: session
            })
            console.log('Successfully resumed the session')
        },

    }))
}

