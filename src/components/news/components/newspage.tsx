'use client'
import { NewsProps } from '@/components/news/components/type'
import { APP_LINKS } from '@/constants'
import useWindowSize from '@/hooks/useWindowSize'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formatDate'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const NewsTabContent = ({ data }: NewsProps) => {
  const [widthConditional, setWidthConditional] = useState(0)
  const [heightConditional, setHeightConditional] = useState(0)
  const { width } = useWindowSize()
  const locale = useLocale()

  useEffect(() => {
    if (width > 800) {
      setWidthConditional(800)
      setHeightConditional((800 / 16) * 9)
      return
    }
    setWidthConditional(width)
    setHeightConditional((width / 16) * 9)
  }, [width])

  return (
    <div className="px-2 lg:container space-y-4">
      {data?.map((n, index) => (
        <div
          key={n.id}
          className={cn(
            'flex flex-col lg:flex-row h-full border border-app-secondary rounded-lg p-4 lg:p-10 ',
            index % 2 === 1 && 'lg:flex-row-reverse',
          )}
        >
          <Image
            src={n.thumbnail}
            width={widthConditional}
            height={heightConditional}
            alt=""
            className=" lg:w-[50%] h-full object-cover rounded-lg"
          />

          <div className="flex flex-col items-start justify-center gap-2  p-2 lg:p-10">
            <p className="text-white font-medium text-sm max pt-2 ">
              {formatDate(n.createdAt, 'dd/MM/yyyy')}
            </p>
            <p className="text-app-secondary font-2xl font-bold text-lg leading-none mt-1">
              {n.title}
            </p>
            <div className="flex flex-col justify-between h-full">
              <p className="text-white font-normal text-sm mt-2 leading-none">
                {n.subtitle}
              </p>
              {n.content?.length > 0 && (
                <p>
                  <Link
                    href={`/${locale}/${APP_LINKS.NEWS()}/${n.id}`}
                    className="flex flex-row-reverse w-full text-app-secondary"
                  >
                    Ler mais...
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
