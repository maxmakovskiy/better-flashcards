import useSWRMutation from 'swr/mutation'



async function modifyCard(url: string, { arg }: { arg: { newFront: string, newBack: string } }) {
    const { newFront: frontText, newBack: backText } = arg
    return fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frontText, backText }),
    }).then(res => {
        if (!res.ok) { throw new Error(`Failed to update flashcard ${url}`)}
        return res.json()
    })
}

export const useCardUpdate = (deckId: string, flashcardNum: number) => {
    const { trigger, isMutating } = useSWRMutation(
        `/api/cards/${deckId}/${flashcardNum}`, modifyCard)

    return {
        triggerCardModification: trigger,
        isCardMutating: isMutating,
    }
}


