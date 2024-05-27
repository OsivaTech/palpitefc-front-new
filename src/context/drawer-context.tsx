'use client'

import { ReactNode, createContext, useContext, useState } from "react";

type DrawerContextType = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
    isQuiz: boolean,
    setIsQuiz: (isOpen: boolean) => void

}

export const DrawerContext = createContext({} as DrawerContextType)

export function DrawerProvider({children}: {children: ReactNode} ) {
    const [isOpen, setIsOpen] = useState(false)
    const [isQuiz, setIsQuiz] = useState(false)
    return (
        <DrawerContext.Provider value={{ isOpen, isQuiz, setIsQuiz, setIsOpen}}>
            {children}
        </DrawerContext.Provider>
    )
}

export function useDrawer() {
    return useContext(DrawerContext)
}

