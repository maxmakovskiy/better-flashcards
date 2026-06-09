import { SessionProvider } from "next-auth/react"
import { StudyStoreProvider } from "./_providers/study-store-provider";
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/prisma'
import StudyWorkspace from "@/app/flashcards/_components/study-workspace"

export default async function HomePage() {
    const session = await auth()

    if (!session) {
        return redirect('/')
    }

    // const decks = await prisma.deck.findMany({
    //     where: { userId: session.user?.id }
    // })

    return (
        <SessionProvider>
            <StudyStoreProvider>
                <StudyWorkspace />
            </StudyStoreProvider>
        </SessionProvider>

    )
}
