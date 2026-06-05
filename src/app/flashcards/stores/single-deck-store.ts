import { createStore } from 'zustand/vanilla'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'

export type SingleDeck = {
    deck: DeckModel | null
    cards: FlashcardModel[] | null
    cardNumToModify: number | null
}

const initialState = {
    deck: null,
    cards: null,
    cardNumToModify: null
}

export type SingleDeckActions = {
    initStore: (deck: DeckModel, cards: FlashcardModel[]) => void
    createCard: (front: string, back: string) => Promise<void>
    modifyCard: (flashcardNum: number, front: string, back: string) => Promise<void>
    deleteCard: (flashcardNum: number) => Promise<void>
}

export type SingleDeckStore = SingleDeck & SingleDeckActions

export const createSingleDeckStore = () => {
    return createStore<SingleDeckStore>()((set, get) => ({
        ...initialState,
        initStore: (deck: DeckModel, cards: FlashcardModel[]) => {
            set({
                deck: deck,
                cards: cards,
            })
        },

        createCard: async (front: string, back: string) => {
            const { deck, cards } = get()
            try {
                const body = { front, back };
                const newCardJSON = await fetch(`/api/decks/${deck!.deckId}/cards`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                const newCard = await newCardJSON.json();
                console.log(`Updating cards collection with new a card on client: ${JSON.stringify(newCard)}`)

                set({
                    cards: [...cards!, newCard],
                })
            } catch (error) {
                console.error(error);
            }
        },

        modifyCard: async (flashcardNum: number, front: string, back: string) => {
            const { deck, cards } = get()
            try {
                const body = { front, back };
                const cardJson = await fetch(`/api/decks/${deck?.deckId}/cards/${flashcardNum}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                const modifiedCard = await cardJson.json();
                console.log(`Updating cards collection with modified card on client: ${JSON.stringify(modifiedCard)}`)

                const idx = cards!.findIndex(c => c.flashcardNum === flashcardNum)
                const p1 = cards!.splice(0, idx)
                const p2 = cards!.splice(idx + 1)
                set({
                    cards: [...p1, modifiedCard, ...p2],
                })
            } catch (error) {
                console.error(error);
            }
        },

        deleteCard: async (flashcardNum: number) => {
            const { deck } = get()
            try {
                const cardsJson = await fetch(`/api/decks/${deck?.deckId}/cards/${flashcardNum}`, {
                    method: "DELETE"
                });
                const cards = await cardsJson.json();
                set({
                    cards: cards
                })
            } catch (error) {
                console.error(error);
            }
        },

    }))
}

