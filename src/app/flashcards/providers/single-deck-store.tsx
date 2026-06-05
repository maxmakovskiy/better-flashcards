'use client'
// Almost fully taken from:
// https://zustand.docs.pmnd.rs/learn/guides/nextjs
// optionally: https://zustand.docs.pmnd.rs/learn/guides/initialize-state-with-props

import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'

import { type SingleDeckStore, createSingleDeckStore } from '@/app/flashcards/stores/single-deck-store'

export type SingleDeckStoreApi = ReturnType<typeof createSingleDeckStore>

export const SingleDeckStoreContext = createContext<SingleDeckStoreApi | undefined>(
    undefined,
)

export interface SingleDeckProviderProps {
    children: ReactNode
}

export const SingleDeckStoreProvider = ({children}: SingleDeckProviderProps) => {
    const [store] = useState(() => createSingleDeckStore())
    return (
        <SingleDeckStoreContext.Provider value={store}>
            {children}
        </SingleDeckStoreContext.Provider>
    )
}

export const useSingleDeckStore = <T,>(selector: (store: SingleDeckStore) => T,): T => {
    const singleDeckStoreContext = useContext(SingleDeckStoreContext)
    if (!singleDeckStoreContext) {
        throw new Error(`useStudyStore must be used within StudyStoreProvider`)
    }

    return useStore(singleDeckStoreContext, selector)
}