import useSWR from 'swr'
import { fetcher } from "./fetcher"
import { EnhancedDeckModel, EnhancedDeckArraySchema } from '@/app/flashcards/types'

export const useAllDecks = () => {
    const { data, error, isLoading, isValidating, mutate } = useSWR<EnhancedDeckModel[], Error>(
        `/api/decks`,
        fetcher
    )

    return {
        allDecks: EnhancedDeckArraySchema.parse(data),
        isAllDecksLoading: isLoading,
        isAllDecksError: !!error,
        isAllDecksValidating: isValidating,
        mutateAllDecks: mutate
    }
}

