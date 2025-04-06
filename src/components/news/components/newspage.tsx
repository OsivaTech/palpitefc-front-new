'use client'
import { NewsProps } from '@/components/news/components/type'
import { APP_LINKS } from '@/constants'
import useWindowSize from '@/hooks/useWindowSize'
import { cn } from '@/lib/utils'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'
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
        <ConditionalWrapper
          key={n.id}
          condition={n.content?.length > 0}
          wrapper={Link}
          href={`/${locale}/${APP_LINKS.NEWS()}/${n.id}`}
          className={cn(
            'flex flex-col lg:flex-row h-full border border-app-secondary rounded-lg',
            index % 2 === 1 && 'lg:flex-row-reverse',
          )}
        >
          <Image
            src={n.thumbnail}
            width={widthConditional}
            height={heightConditional}
            alt=""
            className="lg:w-[50%] h-full object-cover rounded-lg"
          />

          <div className="flex flex-col w-full items-start justify-around gap-3 p-2 lg:p-6">
            <div>
              <p className="text-white font-medium text-sm max pt-2 ">
                {format(n.createdAt, "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-app-secondary font-2xl font-bold text-lg leading-none mt-1">
                {n.title}
              </p>
            </div>
            {n.subtitle && (
              <p className="text-white font-normal text-sm mt-2 leading-none">
                {n.subtitle}
              </p>
            )}
            <div className="flex flex-row justify-between w-full">
              <p className="text-sm">
                por{' '}
                <span className="font-bold text-app-secondary">
                  {n.author.name}
                </span>
              </p>
              {n.content?.length > 0 && (
                <p className="text-sm text-white/70">Ler mais...</p>
              )}
            </div>
          </div>
        </ConditionalWrapper>
      ))}
    </div>
  )
}

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
  ...props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const Wrapper = condition ? wrapper : 'div'
  return <Wrapper {...props}>{children}</Wrapper>
}
