import useSWRMutation from "swr/mutation"
import { EnhancedDeckModel } from '@/app/flashcards/types'
import { EnhancedFlashcardsDeckSchema } from '@/app/flashcards/_schemas/types/deck-schema'

interface CreateNewDeckArgs {
    title: string;
    description: string;
    closeDialog: () => void;
}

const createNewDeck = async (url: string, { arg }: { arg: CreateNewDeckArgs }) => {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: arg.title, description: arg.description }),
    }).then(res => {
        if (!res.ok) {
            throw new Error(`Failed to create new deck with title=${arg.title}`)
        }
        return res.json()
    }).then(newDeck => {
        return EnhancedFlashcardsDeckSchema.parse(newDeck) as EnhancedDeckModel
    }).then(deck => {
        arg.closeDialog()
        return deck
    })
}

export const useCreateDeck = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        '/api/decks',
        createNewDeck,
        {
            populateCache: (result: EnhancedDeckModel, currentData?: EnhancedDeckModel[]) => {
                if (!Array.isArray(currentData)) {
                    return [result]
                }
                return [...currentData, result]
            },
            revalidate: false,

        }
    )

    return {
        createNewDeck: trigger,
        isCreationOngoing: isMutating,
        isCreationFailed: !!error,
    }
}

