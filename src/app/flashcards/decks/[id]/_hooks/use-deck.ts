import useSWR from 'swr'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { fetcher } from '../../_hooks/fetcher'
import { DeckSchema } from '@/app/flashcards/types'

export const useDeck = (deckId: string) => {
    const { data, error, isLoading, mutate } = useSWR<DeckModel, Error>(
        `/api/decks/${deckId}`,
        fetcher
    )

    return {
        deck: DeckSchema.parse(data),
        isDeckLoading: isLoading,
        isDeckError: !!error,
        deckMutate: mutate
    }
}

