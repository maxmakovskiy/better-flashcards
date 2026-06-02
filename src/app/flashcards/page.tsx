import StudyWorkspace from "@/app/flashcards/_components/study-workspace"
import { StudyStoreProvider } from "@/app/flashcards/providers/study-store-provider";
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/prisma'

export default async function HomePage() {
    const session = await auth()

    if (!session) {
        return redirect('/')
    }

    // const decks = await prisma.deck.findMany({
    //     where: { userId: session.user?.id }
    // })

    return (
        <StudyStoreProvider>
            <StudyWorkspace
                decks={[]} />
        </StudyStoreProvider>
    )
}
