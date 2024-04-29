'use client'
import { LoginForm } from "@/components/LoginForm"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer"
import { Separator } from "@radix-ui/react-select"
import { Menu } from "lucide-react"
import { useTranslations } from "next-intl"

export const SignInSignUpDrawer = () => {
    const t = useTranslations()
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="text-white " variant='link' >{t('components.Header.signInSignUp')}</Button>
            </DrawerTrigger>
            <DrawerContent className="bg-app-background ">
                <DrawerHeader>
                    Palpite Futibol Clube
                </DrawerHeader>
                <LoginForm />
                <span className="flex justify-center items-center my-4">Não é cadastrado?  <Button variant='link'>registre-se</Button></span>
            </DrawerContent>
            <Menu />
        </Drawer>
    )
}