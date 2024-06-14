'use client'
import { BottonMenu } from "@/components/bottom-menu"
import { ReactNode } from "react"

export const HomeContainer = ({children}: {children:ReactNode}) => {
    // const windowWidth = useWindowSize()
    return (
        <div className="h-full"> 
          {children}
          <BottonMenu />
        </div>
    )
}