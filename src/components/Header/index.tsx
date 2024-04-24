'use client'
import { Menu } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import { LoginDrawer } from "../LoginDrawer"
import { Drawer, DrawerTrigger } from "../ui/drawer"

export const ApplicationHeader = () => {
    return(
    <>
        <Drawer>
            <header className="flex justify-between items-center bg-app-background py-2 px-3 sticky top-0 z-10">
                <Image src='/assets/logo.png' alt="" width={205} height={34}  />
                <div className="flex justify-center items-center gap-2">
                    <DrawerTrigger>
                        <Button className="text-white" variant='link' >Cadastre-se</Button>
                    </DrawerTrigger>
                    <Menu />
                </div>
            </header>
            <LoginDrawer />
        </Drawer>
    </>
    
    ) 

}