import DecksWorkspace from '@/app/flashcards/decks/_components/decks-workspace'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/prisma'

export default async function DecksPage() {
    const session = await auth()

    if (!session) {
        return redirect('/')
    }

    const decks = await prisma.deck.findMany({
        where: { userId: session.user?.id },
        include: {
            flashcards: true
        }
    })

    return <DecksWorkspace initDecks={decks} />
}
