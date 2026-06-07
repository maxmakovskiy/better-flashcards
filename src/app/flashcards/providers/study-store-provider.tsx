'use client'
// Almost fully taken from:
// https://zustand.docs.pmnd.rs/learn/guides/nextjs
// optionally: https://zustand.docs.pmnd.rs/learn/guides/initialize-state-with-props

import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'

import { type StudyStore, createStudyStore } from '@/app/flashcards/stores/study-store'

export type StudyStoreApi = ReturnType<typeof createStudyStore>

export const StudyStoreContext = createContext<StudyStoreApi | undefined>(
    undefined,
)

export interface StudyStoreProviderProps {
    children: ReactNode
}

export const StudyStoreProvider = ({children}: StudyStoreProviderProps) => {
    const [store] = useState(() => createStudyStore())
    return (
        <StudyStoreContext.Provider value={store}>
            {children}
        </StudyStoreContext.Provider>
    )
}

export const useStudyStore = <T,>(selector: (store: StudyStore) => T,): T => {
    const studyStoreContext = useContext(StudyStoreContext)
    if (!studyStoreContext) {
        throw new Error(`useStudyStore must be used within StudyStoreProvider`)
    }

    return useStore(studyStoreContext, selector)
}