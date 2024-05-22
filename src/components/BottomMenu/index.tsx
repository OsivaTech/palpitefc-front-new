'use client'
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { ReactNode } from "react"
import Image from "next/image"

export const BottonMenu = () => {
    const t = useTranslations()

    return (
        <div className=" mx-auto py-2  w-full flex justify-between items-center bg-[#2D3745] sticky bottom-0 ">
            <BottomMenuItem icon={<Image className="self-center" src={'/assets/survey.svg'} height={20} width={20}  alt="" />} label="Enquete" onClick={() => console.log('premio')} />
            <BottomMenuItem icon={<Image className="self-center" src={'/assets/trophy.svg'} height={20} width={20}  alt="" />} label="Premios e Regras" onClick={() => console.log('premio')} />
            <BottomMenuItem icon={<Image className="self-center" src={'/assets/user.svg'} height={20} width={20}  alt="" />} label="Minha conta" onClick={() => console.log('premio')} />
        </div>
    )
}

type BottomMenuItemProps = {
    icon: ReactNode;
    label: string;
    onClick: () => void
}
export const BottomMenuItem = ( { icon, label, onClick}: BottomMenuItemProps) => {
    return (
        <Button className="rounded-nonde w-full h-full" variant='ghost' onClick={onClick}>
            <div className="flex flex-col justify-center items-ceter w-full">
                {icon}
                <span className="text-xs">{label}</span>
            </div>
        </Button>
    )
}