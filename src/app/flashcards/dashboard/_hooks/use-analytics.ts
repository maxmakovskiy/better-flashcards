import useSWR from 'swr'
import { AnalyticData } from '@/app/flashcards/types'
import { ClientAnalyticsSchema } from '@/app/flashcards/_schemas/analytics-schema'

const fetcher = async (url: string, date: Date) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ endDate : date })
    })
    if (!res.ok) {
        const info = await res.json()
        const status = res.status
        throw new Error(`An error occurred while fetching the data. Url: ${url}; Message: ${info}; Status: ${status}`)
    }
    const obj = await res.json()
    console.log('Client response: ' + JSON.stringify(obj))
    return ClientAnalyticsSchema.parse(obj) as AnalyticData
}

export const useAnalytics = (date: Date) => {
    const { data, error, isLoading, isValidating } = useSWR<AnalyticData, Error>(
        '/api/dashboard',
        (url: string) => fetcher(url, date),
        {
            revalidateOnFocus: false
        }
    )

    return {
        analyticsData: data,
        isAnalyticsLoading: isLoading,
        isAnalyticsError: !!error,
        isAnalyticsValidating: isValidating
    }
}

