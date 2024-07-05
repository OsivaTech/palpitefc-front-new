'use client'

import { Advertisament } from '@/types/Advertisament'
import Image from 'next/image'
import Link from 'next/link'

export type BannerType = {
  imageLink: string
  redirectTo: string
}
export type CarrouselProps = {
  item?: Advertisament
}

export const BannerFixed = ({ item }: CarrouselProps) => {
  return (
    <div className="w-full">
      <div>
        {item?.id}
        <div className="max-h-[150px]">
          <div className="p-none w-full flex justify-center items-center overflow-auto">
            <Link href={item?.urlGoTo ?? ''}>
              <Image
                src={item?.imageCard ?? ''}
                width={430}
                height={150}
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
