import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { SWRConfig } from 'swr'
import DashboardWorkspace from '@/app/flashcards/dashboard/_components/dashboard-workspace'
import { ClientAnalyticsSchema } from '@/app/flashcards/_schemas/analytics-schema'
import { extractAnalytics } from '@/app/flashcards/dashboard/_lib/extract-analytics'

export default async function DashboardPage() {
    const session = await auth()

    if (!session || !session.user || !session.user.id) {
        // TODO: redirect 401
        return redirect('/')
    }

    const analytics: Promise<ClientAnalyticsSchema> = extractAnalytics(
        session.user.id, new Date())

    return (
        <SWRConfig
            value={{
                fallback: {
                    '/api/dashboard': analytics,
                },
            }}
        >
            <DashboardWorkspace />
        </SWRConfig>
    )
}
