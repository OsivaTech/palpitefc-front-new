'use client'
import { usePageModal } from "@/context/usePageModal";
import { User } from "@/types/User";
import { X } from "lucide-react";
import Image from "next/image";

export const ModalPageHeader =  ({user}: {user: User}) => {
    const {closePageModal} = usePageModal();
    return (
        <div className="flex justify-between items-start">
        <div className="flex justify-start items-end gap-3">
            <Image src={user?.team.image || ''} height={45} width={45} alt="" />
            <span className="h-full">{user?.name}</span>
        </div>
        <X className="cursor-pointer"  onClick={closePageModal}/>
    </div>
    );
}