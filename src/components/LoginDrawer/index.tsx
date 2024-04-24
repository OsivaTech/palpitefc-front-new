import { LoginForm } from "../LoginForm"
import { Button } from "../ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"


export const LoginDrawer = () => {

    return (
        <DrawerContent className="bg-app-background">
            <DrawerHeader>
                Palpite Futibol Clube
            </DrawerHeader>
            <LoginForm />
        </DrawerContent>
    )

}