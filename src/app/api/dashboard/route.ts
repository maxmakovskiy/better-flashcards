import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { ClientAnalyticsSchema, ServerAnalyticsSchema } from '@/app/flashcards/_schemas/analytics-schema'
import { extractAnalytics } from '@/app/flashcards/dashboard/_lib/extract-analytics'

export const POST = auth(async function POST(req) {
    if (!req.auth || !req.auth.user || !req.auth.user.id) {
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const body = await req.json().then(r => {
            return ServerAnalyticsSchema.safeParse(r)
        })
        if (!body.success) {
            console.error(`Wrong data provided: ${body.error}`)
            return NextResponse.json(
                { message: 'Wrong data provided' },
                { status: 400 }
            )
        }
        const analytics: ClientAnalyticsSchema = await extractAnalytics(
            req.auth.user.id, body.data.endDate, body.data.startDate)

        return NextResponse.json(analytics)
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        )
    }
})

