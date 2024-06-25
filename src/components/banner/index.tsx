import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Advertisament } from "@/types/Advertisament"
import Image from "next/image"
import Link from "next/link"

export type BannerType = {
  imageLink:string
  redirectTo: string
}
export type CarrouselProps = {
  items?: Advertisament[]
}

export const Banner = async ({items}: CarrouselProps) => {
    return (
      <Carousel className="w-full" >
        <CarouselContent>
          { items ? items.map((item, index) => (
            <CarouselItem key={index} className="max-h-[150px]">
              <div className="p-none w-full flex justify-center items-center overflow-auto">
                <Link href={item.urlGoTo}>
                    <Image src={item.imageBanner} width={430} height={150}  alt=""/>
                </Link>
              </div>
            </CarouselItem>
          )) : (
            <CarouselItem className="bg-slate-400 h-36">
          </CarouselItem>
          ) }
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>
    )
}