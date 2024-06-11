'use client'
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { ReactNode } from "react"
import Image from "next/image"
import { usePageModal } from "@/context/usePageModal"
import { ModalPageQuiz } from "@/components/modal-page-quiz"
import { useAuth } from "@/context/useAuth"
import { User } from "@/types/User"
import { ModalPageProfile } from "@/components/modal-page-profile"

export const BottonMenu = () => {
    const t = useTranslations()
    const {render, openPageModal} = usePageModal()
    const { user } = useAuth()
  

    const handleOpenQuiz = () => {
        render(<ModalPageQuiz user={user ?? {} as User} />)
        openPageModal()
    }

    const hadnleOpenProfile = () => {
        render(<ModalPageProfile user={user ?? {} as User} />)
        openPageModal()
    }
    return (
        <div className="mx-auto py-2  w-full flex justify-between items-center bg-[#2D3745] sticky bottom-0 ">
            <BottomMenuItem 
                icon={<Image className="self-center" 
                    src={'/assets/survey.svg'} 
                    height={20} 
                    width={20}  
                    alt="" />
                } 
                label="Enquete" 
                onClick={handleOpenQuiz} />
            <BottomMenuItem 
                icon={<Image className="self-center" src={'/assets/trophy.svg'} 
                height={20} width={20}  
                alt="" />} 
                label="Premios e Regras" 
                onClick={openPageModal} />
            <BottomMenuItem 
                icon={<Image className="self-center" src={'/assets/user.svg'} 
                height={20} 
                width={20}  
                alt="" />} label="Minha conta" 
                onClick={hadnleOpenProfile} />
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