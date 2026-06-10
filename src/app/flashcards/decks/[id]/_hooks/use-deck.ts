import useSWR from 'swr'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { DeckSchema } from '@/app/flashcards/_schemas/types/basic-deck-schema'
import { generalGetFetcher } from '@/app/flashcards/decks/_hooks/general-get-fetcher'

export const useDeck = (deckId: string) => {
    const { data, error, isLoading, mutate } = useSWR<DeckModel, Error>(
        `/api/decks/${deckId}`,
        (url: string) => generalGetFetcher(url)
            .then(obj => DeckSchema.parse(obj) as DeckModel)
    )

    return {
        deck: data,
        isDeckLoading: isLoading,
        isDeckError: !!error,
        deckMutate: mutate
    }
}

