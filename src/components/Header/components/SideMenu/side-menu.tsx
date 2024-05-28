'use client'
import { MenuItem } from "@/components/Header/components/SideMenu/components/menu-item"
import { QuizGroup } from "@/components/Header/components/SideMenu/components/quiz-group"
import { getQuiz, signout } from "@/components/Header/components/SideMenu/data"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { useAuth } from "@/context/auth-context"
import { useDrawer } from "@/context/drawer-context"
import { Quiz } from "@/shared/types/Quiz"
import { User } from "@/shared/types/User"
import { LogOut, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const SideMenu = () => {
    const {  getUser } = useAuth()
    const user = getUser()
    const [quiz, setQuiz] = useState<Quiz[]>()
    const { signOut, isUserLogged } = useAuth()

    const handleLogout = async () => {
        await signout()
        signOut()
    }
    const {isOpen, setIsOpen, isQuiz, setIsQuiz} = useDrawer()
    
    useEffect(() => {
        const loadQuiz = async () => {
            if(isQuiz){
                const response = await getQuiz(isUserLogged())
                setQuiz(response)
            }
        }
        loadQuiz()
    }, [isQuiz, isUserLogged])
    
    return ( 
        <Sheet open={isOpen} modal>
            <SheetTrigger  className="flex flex-col justify-center items-center" onClick={() => setIsOpen(true)}>
                <Image src={user?.team.image || ''} height={25} width={25} alt="" />
                {user?.name}
            </SheetTrigger>
            <SheetContent side='left' className="w-full bg-[#2D3745]">
                <div className="flex justify-between items-start">
                    <div className="flex justify-start items-end gap-3">
                        <Image src={user?.team.image || ''} height={45} width={45} alt="" />
                        <span className="h-full">{user?.name}</span>
                    </div>
                    <X  onClick={() =>{ 
                        setIsOpen(false)
                        setIsQuiz(false)
                    }}/>
                </div>
               <Separator className="my-6 border border-white/50" />
                {!isQuiz ? (
                    <ol>
                        <MenuItem onClick={handleLogout}>
                            <LogOut size={20} />
                            Sair
                        </MenuItem>
                    </ol>
                ) : (
                    <QuizGroup data={quiz || [] as Quiz[]} />
                )}
            </SheetContent>
        </Sheet>
    )
}

