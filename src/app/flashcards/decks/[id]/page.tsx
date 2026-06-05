import { SWRConfig } from 'swr'
import { prisma } from '@/prisma'

import SingleDeckWorkspace from '@/app/flashcards/decks/[id]/_components/single-deck-workspace'

export default async function SingleDeckPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const deckUrl = `/api/decks/${id}`
    const cardsUrl = `/api/cards/${id}`
    const deckPromise = prisma.deck.findUniqueOrThrow({
        where: { deckId: id },
        include: { flashcards: true }
    })
    const flashcardsPromise = prisma.flashcard.findMany({
        where: { deckId: id }
    })

    return (
        <SWRConfig
            value={{
                fallback: {
                    // Pass the promises to client components.
                    deckUrl: deckPromise,
                    cardsUrl: flashcardsPromise,
                },
            }}
        >
            <SingleDeckWorkspace deckId={id} />
        </SWRConfig>
    )

}
