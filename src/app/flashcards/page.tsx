import { SessionProvider } from 'next-auth/react'
import { StudyStoreProvider } from './_providers/study-store-provider'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import StudyWorkspace from '@/app/flashcards/_components/study-workspace'

export default async function HomePage() {
    const session = await auth()

    if (!session) {
        return redirect('/')
    }

    return (
        <SessionProvider>
            <StudyStoreProvider>
                <StudyWorkspace />
            </StudyStoreProvider>
        </SessionProvider>

    )
}
