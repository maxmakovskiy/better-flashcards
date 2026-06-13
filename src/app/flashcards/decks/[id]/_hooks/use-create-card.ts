import useSWRMutation from "swr/mutation"
import { FlashcardSchema } from '@/app/flashcards/_schemas/types/flashcard-schema'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'

interface CreateNewCardArgs {
    frontText: string;
    backText: string;
    closeDialog: () => void;
}

const createCard = async (url: string, { arg }: { arg: CreateNewCardArgs }) => {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frontText: arg.frontText, backText: arg.backText  }),
    }).then(res => {
        if (!res.ok) {
            throw new Error(`Failed to create new flashcard (front=${arg.frontText}; back=${arg.backText})`)
        }
        return res.json()
    }).then(card => {
        return FlashcardSchema.parse(card)
    }).then((c: FlashcardModel) => {
        arg.closeDialog()
        return c
    })
}


export const useCreateCard = (deckId: string) => {
    const { trigger, isMutating, error } = useSWRMutation(
        `/api/cards/${deckId}`,
        createCard,
        {
            populateCache: (result: FlashcardModel, currentData?: FlashcardModel[]) => {
                if (!Array.isArray(currentData)) {
                    return [result]
                }
                return [...currentData, result]
            },
            revalidate: false,
        }
    )

    return {
        createNewCard: trigger,
        isCardCreationOngoing: isMutating,
        isCardCreationFailed: !!error,
    }
}

