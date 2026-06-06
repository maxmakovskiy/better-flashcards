import useSWR  from 'swr'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { fetcher } from '../../_hooks/fetcher'

export const useCards = (deckId: string) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR<FlashcardModel[], Error>(
        `/api/cards/${deckId}`,
        fetcher
    )

    return {
        cards: data,
        isCardsLoading: isLoading,
        isCardsValidating: isValidating,
        isCardsError: !!error,
        cardsMutate: mutate
    }
}

