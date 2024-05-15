'use client'
import { SideMenu } from "@/components/Header/components/SideMenu/side-menu"
import { SignInSignUpSection } from "@/components/Header/components/SignInSignUpDrawer"
import { useAuth } from "@/context/auth-context"

export const ActionMenu = () => {
    const{isUserLogged} = useAuth()

    return (
        <div className="flex justify-center items-center gap-2">
            {isUserLogged() ? (
                <SideMenu />
            ) : (
                <SignInSignUpSection />
            ) }
        </div>
    )
}