'use client'
import { BottonMenu } from '@/components/bottom-menu'
import { ReactNode } from 'react'

export const HomeContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col justify-between">
      {children}
      <BottonMenu />
    </div>
  )
}
