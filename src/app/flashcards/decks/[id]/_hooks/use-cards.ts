import useSWR  from 'swr'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { fetcher } from "@/app/flashcards/decks/[id]/_hooks/use-deck"

export const useCards = (deckId: string) => {
    const { data, error, isLoading, mutate } = useSWR<FlashcardModel[], Error>(
        `/api/cards/${deckId}`,
        fetcher
    )

    return {
        cards: data,
        isCardsLoading: isLoading,
        isCardsError: !!error,
        cardsMutate: mutate
    }
}

