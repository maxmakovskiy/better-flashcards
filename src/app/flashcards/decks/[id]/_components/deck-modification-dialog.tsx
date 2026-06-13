import { useState } from 'react'
import DeckDialog from '@/app/flashcards/decks/_components/deck-dialog'
import { DeckModel } from '@/../prisma/generated/prisma/models/Deck'
import { DeckSchema } from '@/app/flashcards/_schemas/types/basic-deck-schema'
import { useDeck } from '@/app/flashcards/decks/[id]/_hooks/use-deck'

interface DeckModificationDialogProps {
    deck: DeckModel;
    isDialogOpen: boolean;
    setDialogClose: () => void;
}

export default function DeckModificationDialog({ deck, isDialogOpen, setDialogClose }: DeckModificationDialogProps) {
    const [newDeckTitle, setNewDeckTitle] = useState(deck.title)
    const [newDeckDescription, setNewDeckDescription] = useState(deck.description)

    const { deckMutate } = useDeck(deck.deckId)

    const modifyDeck = async () => {
        setDialogClose()
        await deckMutate(
            async () => {
                return fetch(`/api/decks/${deck.deckId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title: newDeckTitle, description: newDeckDescription }),
                    }).then(res => {
                        if (!res.ok) {
                            throw new Error(`Failed to update the deck with id=${deck.deckId}`)
                        }
                        return res.json()
                    }).then(d => DeckSchema.parse(d))
            },
            {
                optimisticData: { ...deck, title: newDeckTitle, description: newDeckDescription },
                rollbackOnError: true,
            }
        )
    }

    return (
        <DeckDialog
            dialogTitle='Edit Deck'
            dialogDescription='Please enter the following information'
            deckTitle={newDeckTitle}
            deckDescription={newDeckDescription}
            setDeckTitle={setNewDeckTitle}
            setDeckDescription={setNewDeckDescription}
            isOpen={isDialogOpen}
            setClose={setDialogClose}
            onComplete={modifyDeck}
        />
    )
}