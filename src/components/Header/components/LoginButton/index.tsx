'use client'
import { LoginForm } from "@/components/LoginForm"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer"
import { Menu } from "lucide-react"

export const LoginButton = () => {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="text-white" variant='link' >Cadastre-se</Button>
            </DrawerTrigger>
            <DrawerContent className="bg-app-background">
                <DrawerHeader>
                    Palpite Futibol Clube
                </DrawerHeader>
                <LoginForm />
            </DrawerContent>
            <Menu />
        </Drawer>
    )
}