'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Advertisament } from '@/types/Advertisament'
import Image from 'next/image'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import { sendGTMEvent } from '@next/third-parties/google'
import {event} from '@/utils/analytics'
import { handleAdClick } from '@/utils/analytics'

export type BannerType = {
  imageLink: string
  redirectTo: string
}
export type CarrouselProps = {
  items?: Advertisament[]
}


export const Banner = ({ items }: CarrouselProps) => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  return (
    <Carousel plugins={[plugin.current]} className="w-full">
      <CarouselContent>
        {items ? (
          items.map((item, index) => (
            <CarouselItem
              onClick={() =>
                handleAdClick('ad_click','BannerAd',item.name,item.urlGoTo )
              }
              key={index}
              className="max-h-[150px]"
            >
              <div className="p-0 w-full flex justify-center items-center overflow-auto">
                <Link href={item.urlGoTo}>
                  <Image
                    src={item.imageBanner}
                    width={430}
                    height={150}
                    alt=""
                  />
                </Link>
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem className="bg-slate-400 h-36"></CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
    </Carousel>
  )
}
