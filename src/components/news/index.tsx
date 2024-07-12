'use client'

import useWindowSize from '@/hooks/useWindowSize'

import { News } from '@/types/News'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const NewsPage = ({ news }: { news: News | null }) => {
  const [widthConditional, setWidthConditional] = useState(0)
  const [heightConditional, setHeightConditional] = useState(0)
  const { width } = useWindowSize()

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
    <div>
      {news && (
        <div key={news.id} className="flex flex-col h-full">
          <p className="text-white  text-2xl mb-1 ">{news.title}</p>
          <p className="text-white  text-sm mb-2 ">{news.subtitle}</p>

          <Image
            src={news.thumbnail}
            width={widthConditional}
            height={heightConditional}
            alt=""
          />

          <p className="text-white  text-lg  mb-2 ">{news.content}</p>
        </div>
      )}
    </div>
  )
}

export default NewsPage
