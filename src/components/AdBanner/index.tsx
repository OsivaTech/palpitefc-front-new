
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

export type Banner = {
    imageLink:string
    redirectTo: string
}
export type AdBannerProps = {
    banners?: Banner[]
}
export const AdBanner = ({banners}: AdBannerProps) => {
    return (
        <Carousel className="w-full" >
        <CarouselContent>
          { banners ? banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="p-1 w-full flex justify-center items-center">
                <Link href={banner.redirectTo}>
                    <Image src={banner.imageLink} width={430} height={150}  alt=""/>
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