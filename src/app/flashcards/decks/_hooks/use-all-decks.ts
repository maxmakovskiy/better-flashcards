import useSWR from 'swr'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { fetcher } from "@/app/flashcards/decks/_hooks/gen-fetcher"
import { EnhancedDeckModel } from '@/app/flashcards/types'

export const useAllDecks = () => {
    const { data, error, isLoading, isValidating } = useSWR<EnhancedDeckModel[], Error>(
        `/api/decks`,
        fetcher
    )

    return {
        allDecks: data,
        isAllDecksLoading: isLoading,
        isAllDecksError: !!error,
        isAllDecksValidating: isValidating
    }
}

