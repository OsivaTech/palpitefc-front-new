'use client'
import { MenuItem } from "@/components/Header/components/SideMenu/components/menu-item"
import { signout } from "@/components/Header/components/SideMenu/data"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { useAuth } from "@/context/auth-context"
import { User } from "@/shared/types/User"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export const SideMenu = () => {
    const {  getUser } = useAuth()
    const user = getUser()

    const {  registerUser } = useAuth()

    const handleLogout = async () => {
        await signout()
        registerUser(null)
    }

    return ( 
        <Sheet >
            <SheetTrigger>{user?.name}</SheetTrigger>
            <SheetContent side='left'>
                <code className="break-words">
                    {JSON.stringify(user)}
                </code>
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

