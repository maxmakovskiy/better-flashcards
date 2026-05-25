import { createStore } from 'zustand/vanilla'



export type Card = {
    id: string
    front: string
    back: string
}

export type Deck = {
    id: string
    title: string
    numOfCards: number
}

export type SessionStatus =
    | "idle"
    | "active"
    | "paused"
    | "completed"

export type StudySession = {
    // Study Session
    sessionId: string | null
    sessionStatus: SessionStatus
    // Selected deck
    selectedDeckId: string | null
    // Cards
    cards: Card[] | null
    currentCardIndex: number
    // Statistics
    reviewedCount: number
    correctCount: number
}

export type StudyStoreAction = {
    initializeSession : (session: StudySession) => void
    selectDeck: (deckId: string) => void
    startSession: (sessionId: string, cards: Card[]) => void
    answerCard: (wasCorrect: boolean) => void
    nextCard: () => void
    pauseSession: () => void
    resumeSession: () => void
    completeSession: () => void
    resetSession: () => void
}

export type StudyStore = StudySession & StudyStoreAction

export const defaultInitState: StudySession = {
    sessionId: null,
    sessionStatus: 'idle',
    selectedDeckId: null,
    cards: null,
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
                sessionId: session.sessionId,
                selectedDeckId: session.selectedDeckId,
                cards: session.cards,
                currentCardIndex: session.currentCardIndex,
                sessionStatus: "active",
            })
        },

        selectDeck: (deckId) => {
            set({
                selectedDeckId: deckId,
            })
        },

        startSession: (sessionId, cards) => {
            set({
                sessionId,
                cards,
                currentCardIndex: 0,
                reviewedCount: 0,
                correctCount: 0,
                sessionStatus: "active",
            })
        },

        answerCard: (wasCorrect) => {
            const state = get()
            set({
                reviewedCount: state.reviewedCount + 1,
                correctCount: wasCorrect
                    ? state.correctCount + 1
                    : state.correctCount,
            })
        },

        nextCard: () => {
            const state = get()
            const nextIndex = state.currentCardIndex + 1
            // End session if done
            if (nextIndex >= state.cards.length) {
                set({
                    sessionStatus: "completed",
                })
                return
            }
            set({
                currentCardIndex: nextIndex,
            })
        },

        pauseSession: () => {
            set({
                sessionStatus: "paused",
            })
        },

        resumeSession: () => {
            set({
                sessionStatus: "active",
            })
        },

        completeSession: () => {
            set({
                sessionStatus: "completed",
            })
        },

        resetSession: () => {
            set({
                selectedDeckId: null,

                sessionId: null,
                sessionStatus: "idle",

                cards: [],
                currentCardIndex: 0,

                reviewedCount: 0,
                correctCount: 0,
            })
        },
    }))
}

