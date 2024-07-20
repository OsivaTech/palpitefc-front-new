'use client'
import { NewsProps } from '@/components/matchboard-news-tab/type'
import { TabsContent } from '@/components/ui/tabs'
import { APP_LINKS } from '@/constants'
import useWindowSize from '@/hooks/useWindowSize'

import { formatDate } from '@/utils/formatDate'
import { Separator } from '@radix-ui/react-separator'
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
    <TabsContent value="news" className=" h-full p-2">
      {/* CARD CONTAINER */}

      {/* NEWS CARD */}
      {data?.map((n) => (
        <Link
          key={n.id}
          className="flex flex-col h-full"
          href={`/${locale}/${APP_LINKS.NEWS()}/${n.id}`}
        >
          <Image
            src={n.thumbnail}
            width={widthConditional}
            height={heightConditional}
            alt=""
          />

          <p className="text-white font-medium text-sm max pt-2 ">
            {formatDate(n.createdAt, "dd 'de' MMMM 'de' yyyy")}
          </p>
          <p className="text-white font-medium text-lg leading-none mt-1">
            {n.title}
          </p>
          <p className="text-white font-normal text-sm mt-2 leading-none">
            {n.subtitle}
          </p>

          <Separator className="my-4 border border-white/20" />
        </Link>
      ))}
    </TabsContent>
  )
}
