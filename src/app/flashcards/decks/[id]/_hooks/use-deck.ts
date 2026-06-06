import useSWR from 'swr'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { fetcher } from '@/app/flashcards/decks/_hooks/gen-fetcher'

export const useDeck = (deckId: string) => {
    const { data, error, isLoading, mutate } = useSWR<DeckModel, Error>(
        `/api/decks/${deckId}`,
        fetcher
    )

    return {
        deck: data,
        isDeckLoading: isLoading,
        isDeckError: !!error,
        deckMutate: mutate
    }
}

