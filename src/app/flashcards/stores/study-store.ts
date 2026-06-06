import { createStore } from 'zustand/vanilla'
import { EnhancedDeckModel } from '@/app/flashcards/types'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'


export type StudySession = {
    session: StudySessionModel | null
    decks: EnhancedDeckModel[] | null
    selectedDeck: EnhancedDeckModel | null
    // Statistics
    currentCardIndex: number
    reviewedCount: number
    correctCount: number
}

export type StudyStoreAction = {
    initializeSession : (session: StudySessionModel) => void
    setDecks: (decks: EnhancedDeckModel[]) => void
    selectDeck: (deckId: string) => void
    // startSession: () => void
    // answerCard: (wasCorrect: boolean) => void
    // nextCard: () => void
    // pauseSession: () => void
    // resumeSession: () => void
    // completeSession: () => void
    // resetSession: () => void
    // setCards: (cards: Card[]) => void
}

export type StudyStore = StudySession & StudyStoreAction

export const defaultInitState: StudySession = {
    session: null,
    decks: null,
    selectedDeck: null,
    currentCardIndex: 0,
    reviewedCount: 0,
    correctCount: 0
}

export const createStudyStore = (
    initState: StudySession = defaultInitState,
) => {
    return createStore<StudyStore>()((set, get) => ({
        ...initState,
        initializeSession: (
            session
        ) => {
            set({
                session: session
            })
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
                reviewedCount: deck?.flashcards.filter(c => (c.nextReviewAt > now) || !!c.lastReviewedAt).length
            })
        }

        // selectDeck: (deckId) => {
        //     set({
        //         selectedDeckId: deckId,
        //     })
        // },
        //
        // setCards: (cards) => {
        //     set({
        //         cards: cards,
        //     })
        // },
        //
        // startSession: (sessionId, cards) => {
        //     set({
        //         sessionId,
        //         cards,
        //         currentCardIndex: 0,
        //         reviewedCount: 0,
        //         correctCount: 0,
        //         sessionStatus: "active",
        //     })
        // },
        //
        // answerCard: (wasCorrect) => {
        //     const state = get()
        //     set({
        //         reviewedCount: state.reviewedCount + 1,
        //         correctCount: wasCorrect
        //             ? state.correctCount + 1
        //             : state.correctCount,
        //     })
        // },
        //
        // nextCard: () => {
        //     const state = get()
        //     const nextIndex = state.currentCardIndex + 1
        //     // End session if done
        //     if (nextIndex >= state.cards.length) {
        //         set({
        //             sessionStatus: "completed",
        //         })
        //         return
        //     }
        //     set({
        //         currentCardIndex: nextIndex,
        //     })
        // },
        //
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
        //
        // completeSession: () => {
        //     set({
        //         sessionStatus: "completed",
        //     })
        // },
        //
        // resetSession: () => {
        //     set({
        //         selectedDeckId: null,
        //
        //         sessionId: null,
        //         sessionStatus: "idle",
        //
        //         cards: [],
        //         currentCardIndex: 0,
        //
        //         reviewedCount: 0,
        //         correctCount: 0,
        //     })
        // },
    }))
}

