'use client'
import { NewsProps } from '@/components/matchboard-news-tab/type'
import { TabsContent } from '@/components/ui/tabs'
import { APP_LINKS } from '@/constants'
import useWindowSize from '@/hooks/useWindowSize'

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

          <p className="text-white  text-sm max text-justify pt-2 ">
            {formatDate(n.createdAt, "dd 'de' MMMM 'de' yyyy")}
          </p>
          <p className="text-white  text-lg  text-justify ">{n.title}</p>
          <p className="text-white  text-sm  text-justify -mt-2 mb-2 ">
            {n.subtitle}
          </p>
        </Link>
      ))}
    </TabsContent>
  )
}
