import useSWR  from 'swr'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { FlashcardArraySchema } from '@/app/flashcards/_schemas/types/flashcard-schema'
import { generalGetFetcher } from '@/app/flashcards/decks/_hooks/general-get-fetcher'

export const useCards = (deckId: string) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR<FlashcardModel[], Error>(
        `/api/cards/${deckId}`,
        (url: string) => generalGetFetcher(url)
            .then(obj => FlashcardArraySchema.parse(obj) as FlashcardModel[])
    )

    return {
        cards: data,
        isCardsLoading: isLoading,
        isCardsValidating: isValidating,
        isCardsError: !!error,
        cardsMutate: mutate
    }
}

