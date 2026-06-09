import useSWR from 'swr'
import { EnhancedDeckModel } from '@/app/flashcards/types'
import { EnhancedFlashcardsDeckArraySchema } from '@/app/flashcards/_schemas/types/deck-schema'
import { generalGetFetcher } from '@/app/flashcards/decks/_hooks/general-get-fetcher'

export const useAllDecks = () => {
    const { data, error, isLoading, isValidating, mutate } = useSWR<EnhancedDeckModel[], Error>(
        '/api/decks',
        (url: string) => generalGetFetcher(url)
            .then(obj => EnhancedFlashcardsDeckArraySchema.parse(obj) as EnhancedDeckModel[])
    )

    return {
        allDecks: data,
        isAllDecksLoading: isLoading,
        isAllDecksError: !!error,
        isAllDecksValidating: isValidating,
        mutateAllDecks: mutate
    }
}

