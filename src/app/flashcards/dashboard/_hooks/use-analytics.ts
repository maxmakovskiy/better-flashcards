import useSWRImmutable from 'swr/immutable'
import { useState } from 'react'
import { AnalyticData } from '@/app/flashcards/types'
import { ClientAnalyticsSchema } from '@/app/flashcards/_schemas/analytics-schema'

const fetcher = async (url: string, date: Date) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ endDate : date })
    })
    if (!res.ok) {
        throw new Error(`An error occurred while fetching the data. Url: ${url}`)
    }
    const obj = await res.json()
    return ClientAnalyticsSchema.parse(obj) as AnalyticData
}

export const useAnalytics = () => {
    const [endDate, setEndDate] = useState<Date>(new Date())
    // const [startDate, setStartDate] = useState<Date | undefined>()

    const { data, error, isLoading, isValidating } = useSWRImmutable<AnalyticData, Error>(
        ['/api/dashboard', endDate],
        ([url, date]) => fetcher(url, date as Date),
    )

    return {
        // startDate,
        // setStartDate,
        endDate,
        setEndDate,
        analyticsData: data,
        isAnalyticsLoading: isLoading,
        isAnalyticsError: !!error,
        isAnalyticsValidating: isValidating
    }
}

