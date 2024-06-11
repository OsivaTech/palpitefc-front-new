'use client'
import { BottonMenu } from "@/components/bottom-menu"
import useWindowSize from "@/hooks/useWindowSize"
import { ReactNode } from "react"

export const HomeContainer = ({children}: {children:ReactNode}) => {
    const windowWidth = useWindowSize()
    return (
        <div> 
          {children}
          {(windowWidth.width <= 768) && <BottonMenu />}
        </div>
    )
}