'use client'
import { MenuItem } from "@/components/Header/components/SideMenu/components/menu-item"
import { signout } from "@/components/Header/components/SideMenu/data"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { useAuth } from "@/context/auth-context"
import { User } from "@/shared/types/User"
import { LogOut } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export const SideMenu = () => {
    const {  getUser } = useAuth()
    const user = getUser()

    const { signOut } = useAuth()

    const handleLogout = async () => {
        await signout()
        signOut()
    }

    return ( 
        <Sheet >
            <SheetTrigger className="flex flex-col justify-center items-center">
                <Image src={user?.team.image || ''} height={25} width={25} alt="" />
                {user?.name}
            </SheetTrigger>
            <SheetContent side='left'>
                <div className="flex justify-start gap-3 items-end">
                    <Image src={user?.team.image || ''} height={45} width={45} alt="" />
                    <span className="h-full">{user?.name}</span>
                </div>
               <Separator className="my-6 border border-white/50" />
                <ol>
                    <MenuItem onClick={handleLogout}>
                        <LogOut size={20} />
                        Sair
                    </MenuItem>
               </ol>
            </SheetContent>
        </Sheet>
    )
}

