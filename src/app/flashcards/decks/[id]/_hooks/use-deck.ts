import useSWR from 'swr'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { DeckSchema } from '@/app/flashcards/types'

const fetcher = async (url: string) => {
    try {
        const res = await fetch(url)
        if (!res.ok) {
            const info = await res.json()
            const status = res.status
            throw new Error(`An error occurred while fetching the data. Url: ${url}; Message: ${info}; Status: ${status}`)
        }
        const obj = await res.json()
        return DeckSchema.parse(obj) as DeckModel
    } catch(e) {
        console.error(e)
        throw e
    }
}

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

