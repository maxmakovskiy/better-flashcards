import useSWRImmutable from 'swr/immutable'
import { useState } from 'react'
import { AnalyticData } from '@/app/flashcards/types'
import { ClientAnalyticsSchema } from '@/app/flashcards/_schemas/analytics-schema'

const fetcher = async (url: string, endDate: Date, startDate: Date | null) => {
    const body = JSON.stringify({ endDate : endDate, startDate : startDate })
    console.log('Body to send: ' + body)
    const res = await fetch(url, {
        method: 'POST',
        body: body,
    })
    if (!res.ok) {
        throw new Error(`An error occurred while fetching the data. Url: ${url}`)
    }
    const obj = await res.json()
    return ClientAnalyticsSchema.parse(obj) as AnalyticData
}

export const useAnalytics = (fromDate?: Date, toDate?: Date) => {
    const [endDate, setEndDate] = useState<Date>(toDate || new Date())
    const [startDate, setStartDate] = useState<Date | null>(fromDate || null)

    const { data, error, isLoading, isValidating } = useSWRImmutable<AnalyticData, Error>(
        ['/api/dashboard', endDate, startDate],
        ([url, endDate, startDate]) => fetcher(url, endDate as Date, startDate as Date | null),
    )

    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        analyticsData: data,
        isAnalyticsLoading: isLoading,
        isAnalyticsError: !!error,
        isAnalyticsValidating: isValidating
    }
}

