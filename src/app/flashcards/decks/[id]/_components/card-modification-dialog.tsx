import { useSWRConfig } from "swr"
import { useState } from 'react'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import CardDialog from '@/app/flashcards/decks/[id]/_components/card-dialog'
import { FlashcardSchema } from '@/app/flashcards/_schemas/types/flashcard-schema'

const modifyCard = async (deckId: string, flashcardNum: number, cardFrontText: string, cardBackText: string) => {
    return fetch(`/api/cards/${deckId}/${flashcardNum}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({frontText: cardFrontText, backText: cardBackText}),
    }).then(res => {
        if (!res.ok) {
            throw new Error(`Failed update the flashcard flashcardNum=${flashcardNum} in deck with deckId=${deckId}`)
        }
        return res.json()
    }).then(card => {
        return FlashcardSchema.parse(card)
    })
}

interface CardModificationDialogProps {
    card: FlashcardModel;
    isDialogOpen: boolean;
    setDialogClose: () => void;
}

export default function CardModificationDialog({ card, isDialogOpen, setDialogClose }: CardModificationDialogProps) {
    const { mutate } = useSWRConfig()

    const modify = async (front: string, back: string) => {
        setDialogClose()
        await mutate(
            `/api/cards/${card.deckId}`,
            modifyCard(card.deckId, card.flashcardNum, front, back),
            {
                populateCache: (result: FlashcardModel, currentData: FlashcardModel[] | undefined) => {
                    if (!Array.isArray(currentData)) {
                        return [result]
                    }
                    return currentData.map((c: FlashcardModel) => {
                        return c.flashcardNum === result.flashcardNum ? result : c
                    })
                },
                optimisticData: currentData => {
                    if (!Array.isArray(currentData)) {
                        return [{...card, frontText: front, backText: back}]
                    }
                    return currentData.map((c: FlashcardModel) => {
                        return c.flashcardNum === card.flashcardNum
                            ? {...card, frontText: front, backText: back}
                            : c
                    })
                },
                rollbackOnError: true,
                revalidate: false
            }
        )
    }

    return (
        <CardDialog
            dialogTitle='Modify card'
            frontText={card.frontText}
            backText={card.backText}
            isOpen={isDialogOpen}
            setClose={setDialogClose}
            onComplete={modify}
        />
    )
}