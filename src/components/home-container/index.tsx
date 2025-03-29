/* eslint-disable camelcase */
'use client'
import { useCookies } from 'next-client-cookies'
import { useSearchParams } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

export const HomeContainer = ({ children }: { children: ReactNode }) => {
  const utm_source = useSearchParams().get('utm_source')
  const cookies = useCookies()

  useEffect(() => {
    if (utm_source && !cookies.get('utm_source')) {
      cookies.set('utm_source', utm_source)
    }
  }, [cookies, utm_source])

  return (
    <div className="flex flex-col items-center justify-center max-w-[1400px] xl:mx-auto">
      {children}
    </div>
  )
}
