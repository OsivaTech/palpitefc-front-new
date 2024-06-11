'use client'
import { ModalPageHeader } from "@/components/modal-page-header";
import { Separator } from "@/components/ui/separator";
import { usePageModal } from "@/context/usePageModal";
import { logout } from "@/lib/session";
import { User } from "@/types/User";
import { LogOut } from "lucide-react";


export const ModalPageProfile = ({user}: {user: User}) => {
    const { closePageModal} = usePageModal();

    const handleLogout = async () => {
        logout();
        closePageModal();
    }
  
    return (
        <>
            <ModalPageHeader user={user} />
            <Separator className="my-6 border border-white/50" />
            <ol>
                <li onClick={handleLogout} className="flex justify-start items-center gap-2 cursor-pointer font-medium text-xs">
                    <LogOut size={20} />
                    Sair
                </li>
            </ol>
        </>
    );
}