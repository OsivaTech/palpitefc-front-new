import { SignInSignUpDrawer } from "@/components/Header/components/SignInSignUpDrawer"
import { getSelf } from "@/data/getSelf"
import { cn } from "@/lib/utils"
import Image from "next/image"


type ApplicationHeaderType = {
    hideMenu?: boolean
}
export const ApplicationHeader = async ({hideMenu}: ApplicationHeaderType) => {
    const user = await getSelf()

    return(
        <>
            <header className={cn("flex justify-between items-center bg-app-background py-2 px-3 sticky top-0 z-10", hideMenu && "justify-center")}>
                <Image src='/assets/logo.png' alt="" width={205} height={34}  />
                {!hideMenu && (
                    <div className="flex justify-center items-center gap-2">
                        {user ? (
                            <span>{user.name}</span>
                        ) : (
                            <SignInSignUpDrawer />
                        ) }
                    </div>
                )}
                
            </header>
        </>
    ) 

}