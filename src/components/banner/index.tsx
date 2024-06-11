'use server'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

export type BannerType = {
  imageLink:string
  redirectTo: string
}
export type CarrouselProps = {
  items?: BannerType[]
}

export const Banner = async ({items}: CarrouselProps) => {
    return (
        <Carousel className="w-full" >
        <CarouselContent>
          { items ? items.map((item, index) => (
            <CarouselItem key={index} className="max-h-[150px]">
              <div className="p-1 w-full flex justify-center items-center overflow-auto">
                <Link href={item.redirectTo}>
                    <Image src={item.imageLink} width={430} height={150}  alt=""/>
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