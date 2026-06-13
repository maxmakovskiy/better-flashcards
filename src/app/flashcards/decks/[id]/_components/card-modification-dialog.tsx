import { useSWRConfig } from "swr"
import { useState } from 'react'
import { FlashcardModel } from '@/../prisma/generated/prisma/models/Flashcard'
import CardDialog from '@/app/flashcards/decks/[id]/_components/card-dialog'
import { FlashcardSchema } from '@/app/flashcards/_schemas/types/flashcard-schema'

const modifyCard = async (deckId: string, flashcardNum: number, cardFrontText: string, cardBackText: string) => {
    return await fetch(`/api/cards/${deckId}/${flashcardNum}`, {
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
    const [cardFrontText, setCardFrontText] = useState(card.frontText)
    const [cardBackText, setCardBackText] = useState(card.backText)
    const { mutate } = useSWRConfig()

    const modify = async () => {
        setDialogClose()
        await mutate(
            `/api/cards/${card.deckId}`,
            modifyCard(card.deckId, card.flashcardNum, cardFrontText, cardBackText),
            {
                populateCache: (result: FlashcardModel, currentData: FlashcardModel[] | undefined) => {
                    if (!Array.isArray(currentData)) {
                        return [result]
                    }
                    return currentData.map((c: FlashcardModel) => {
                        return c.flashcardNum === card.flashcardNum ? card : c
                    })
                },
                optimisticData: currentData => {
                    if (!Array.isArray(currentData)) {
                        return [{...card, frontText: cardFrontText, backText: cardBackText}]
                    }
                    return currentData?.map((c: FlashcardModel) => {
                        return c.flashcardNum === card.flashcardNum
                            ? {...card, frontText: cardFrontText, backText: cardBackText}
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
            frontText={cardFrontText}
            backText={cardBackText}
            setFrontText={setCardFrontText}
            setBackText={setCardBackText}
            isOpen={isDialogOpen}
            setClose={setDialogClose}
            onComplete={modify}
        />
    )
}