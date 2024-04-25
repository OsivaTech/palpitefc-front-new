import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

export type GessCardProps = {
   fixture: Fixture
}
import { LockKeyhole, X } from 'lucide-react';
import Image from "next/image"
import { Input } from "../ui/input";
import { Fixture } from "@/shared/types/Fixture";

export const GessCard = ( {
    fixture
}: GessCardProps ) => {
    return (
        <Card className="bg-[#2D3745] h-[138px] w-[356px] py-3 px-4 border-0 border-b">
            <CardContent className="flex flex-col p-0 gap-2" >
                <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                        <span className="text-[#FFFFFF]/50 flex items-center gap-1  ">
                            <LockKeyhole size={14}  />
                            Meus Palpites
                        </span>
                        <span className="text-white">Brasileirão</span>
                    </div>
                    <span className="text-white">13/03 terça 17:00</span>
                </div>

                <div className="flex justify-between items-center text-white">
                    <div className="flex flex-1 justify-center items-center gap-3" >
                        <div className="flex flex-col items-center justify-center ">
                            <Image src={fixture.homeTeam.image} width={50} height={50} alt=""  />
                            <span>{fixture.homeTeam.name}</span>
                        </div>
                        <Input className="w-10 text-black text-xl px-2 text-center" maxLength={2} placeholder="0"  />
                       
                    </div>

                    <X className="self-center mr-3" />
                    <div className="flex flex-1 justify-center items-center gap-3">
                        <Input className="w-10 text-black text-xl px-2 text-center" maxLength={2} placeholder="0"  />
                        <div className="flex flex-col items-center justify-center">
                            <Image src={fixture.awayTeam.image}  width={50} height={50} alt="" />
                            <span>{fixture.awayTeam.name}</span>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}