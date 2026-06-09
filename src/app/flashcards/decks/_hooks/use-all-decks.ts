import useSWR from 'swr'
import { EnhancedDeckModel } from '@/app/flashcards/types'
import { EnhancedFlashcardsDeckArraySchema } from '@/app/flashcards/_schemas/types/deck-schema'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        const info = await res.json()
        const status = res.status
        throw new Error(`An error occurred while fetching the data. Url: ${url}; Message: ${info}; Status: ${status}`)
    }
    const obj = await res.json()
    return EnhancedFlashcardsDeckArraySchema.parse(obj) as EnhancedDeckModel[]
}

export const useAllDecks = () => {
    const { data, error, isLoading, isValidating, mutate } = useSWR<EnhancedDeckModel[], Error>(
        `/api/decks`,
        fetcher
    )

    return {
        allDecks: data,
        isAllDecksLoading: isLoading,
        isAllDecksError: !!error,
        isAllDecksValidating: isValidating,
        mutateAllDecks: mutate
    }
}

