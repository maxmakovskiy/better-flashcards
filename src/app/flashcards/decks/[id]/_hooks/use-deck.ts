import useSWR from 'swr'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'

export const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        const info = await res.json()
        const status = res.status
        throw new Error(`An error occurred while fetching the data. Url: ${url}; Message: ${info}; Status: ${status}`)
    }
    return res.json()
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

