import { createStore } from 'zustand/vanilla'
import { EnhancedDeckModel, EnhancedDeckArraySchema } from '@/app/flashcards/types'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import { FlashcardModel } from "@/../prisma/generated/prisma/models/Flashcard"
import { DifficultyRatingEnum } from "@/../prisma/generated/prisma/enums"
import { SuperMemoGrade, supermemo } from 'supermemo'
import dayjs from 'dayjs'

export type StudySessionStatus = 'uninitialized' | 'started' | 'paused' | 'finished'

export type StudySession = {
    session: StudySessionModel | null
    status: StudySessionStatus
    decks: EnhancedDeckModel[] | null
    cards: FlashcardModel[] | null
    selectedDeck: EnhancedDeckModel | null
    // Statistics
    isCurrentCardAnswered: boolean
    reviewedCount: number
    correctCount: number
    timerTimestamp: Date | null
}

export type StudyStoreAction = {
    startSession: () => void
    setDecks: (decks: EnhancedDeckModel[]) => void
    selectDeck: (deckId: string) => void
    answerCard: (grade: SuperMemoGrade) => void
    revealCard: () => void
    completeSession: () => void
    loadDecks: () => void
}

export type StudyStore = StudySession & StudyStoreAction

export const defaultInitState: StudySession = {
    session: null,
    status: 'uninitialized',
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
                    })
                set({
                    session: session,
                    status: 'started',
                    timerTimestamp: new Date()
                })
            } catch (e) {
                console.log(e)
            }
        },
        setDecks: (decks: EnhancedDeckModel[]) => {
            set({
                decks: decks
            })
        },
        selectDeck: (deckId: string) => {
            const { decks } = get()
            const deck = decks?.find(d => d.deckId === deckId)
            const now = new Date()
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
        completeSession: async () => {
            const { session, loadDecks } = get()
            try {
                await fetch(`/api/session/${session?.sessionId}/finish`, { method: 'POST' })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`Failed to finish the session with id=${session?.sessionId}`)
                        }
                        return res.json()
                    })

                set({
                    session: session,
                    status: 'finished'
                })
                loadDecks()
            } catch (e) {
                console.log(e)
            }
            console.log('Successfully finishing session')
        },
        revealCard: () => {
            const { isCurrentCardAnswered } = get()
            set({
                isCurrentCardAnswered: !isCurrentCardAnswered,
            })
        },
        loadDecks: async () => {
            try {
                const decks = await fetch('/api/session/decks')
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to fetch the decks to review')
                        }
                        return res.json()
                    }).then(decks => {
                    return EnhancedDeckArraySchema.parse(decks)
                })
                set({
                    decks: decks as EnhancedDeckModel[]
                })
            } catch(e) {
                console.error(e)
            }
        }

        // pauseSession: () => {
        //     set({
        //         sessionStatus: "paused",
        //     })
        // },
        //
        // resumeSession: () => {
        //     set({
        //         sessionStatus: "active",
        //     })
        // },

    }))
}

