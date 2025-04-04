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

  const renderContentAsParagraphs = (content: string) => {
    return content
      .replace(/\\n/g, '\n')
      .split('\n')
      .map((paragraph, index) => (
        <p key={index} className="text-white font-normal text-lg mb-4">
          {paragraph}
        </p>
      ))
  }

  return (
    <div className="px-2 pt-10 max-w-[600px] mx-auto space-y-4">
      {news && (
        <div key={news.id} className="flex flex-col h-full">
          <p className="text-app-secondary font-bold text-2xl mb-1 leading-none">
            {news.title}
          </p>
          <p className="text-white font-normal text-sm mb-2 leading-none">
            {news.subtitle}
          </p>

          <Image
            src={news.thumbnail}
            width={widthConditional}
            height={heightConditional}
            alt=""
          />

          <div className="mt-2">{renderContentAsParagraphs(news.content)}</div>
        </div>
      )}
    </div>
  )
}

export default NewsPage
