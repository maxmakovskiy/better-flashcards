import useSWR  from 'swr'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import { FlashcardArraySchema } from '@/app/flashcards/types'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        const info = await res.json()
        const status = res.status
        throw new Error(`An error occurred while fetching the data. Url: ${url}; Message: ${info}; Status: ${status}`)
    }
    const obj = await res.json()
    return FlashcardArraySchema.parse(obj) as FlashcardModel[]
}

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

