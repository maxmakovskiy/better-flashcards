import useSWRImmutable from 'swr/immutable'
import { generalGetFetcher } from '@/app/flashcards/decks/_hooks/general-get-fetcher'
import { StreakSchema } from '@/app/flashcards/_schemas/streak-schema'

export const useStreak = () => {
    const {
        data,
        isLoading,
        isValidating,
        error
    } = useSWRImmutable<number, Error>(
        '/api/session/streak',
        (url: string) => generalGetFetcher(url)
            .then(obj => StreakSchema.safeParse(obj))
            .then(data => {
                if (!data.success) {
                    throw new Error('Unable to fetch streak')
                }
                return data.data.streak
            })
    )

    return {
        streak: data,
        isStreakLoading: isLoading,
        isStreakValidating: isValidating,
        isStreakError: !!error
    }
}