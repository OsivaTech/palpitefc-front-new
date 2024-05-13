import { NewsProps } from "@/app/[locale]/(application)/components/MainBoard/components/NewsTabContent/type"
import { TabsContent } from "@/components/ui/tabs"
import Image from "next/image"

export const NewsTabContent = ({ data }: NewsProps) => {
    return (
            <TabsContent value="news" className="bg-slate-200 h-full">
                {/* CARD CONTAINER */}
            <div className="flex flex-col gap-2 h-full overflow-scroll">

                {/* NEWS CARD */}
                {data?.map(n => (
                    <div key={n.id} className="flex gap-2 h-[131px] px-3 py-2 bg-white justify-start items-start ">
                        <Image src={n.thumbnail} width={120} height={104}  alt="" className="h-[104px] min-w-[120px] rounded-lg bg-slate-200"/>
                        <p className="text-black text-sm max text-justify h-[104px]  line-clamp-5">
                            {n.content}
                        </p>
                    </div>
                ))}
            </div>

            </TabsContent>
    )
}