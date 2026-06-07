import AllDecksWorkspace from './_components/all-decks-workspace'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/prisma'
import { SWRConfig } from 'swr'
import { EnhancedDeckModel } from '@/app/flashcards/types'

export default async function DecksPage() {
    const session = await auth()

    if (!session) {
        // TODO: redirect 401
        return redirect('/')
    }

    const decksPromise: Promise<EnhancedDeckModel[]> = prisma.deck.findMany({
        where: { userId: session.user?.id },
        include: {
            flashcards: true
        }
    })

    return (
        <SWRConfig
            value={{
                fallback: {
                    '/api/decks': decksPromise,
                },
            }}
        >
            <AllDecksWorkspace />
        </SWRConfig>
    )
}
