import { SignInSignUpDrawer } from "@/components/Header/components/SignInSignUpDrawer"
import { getSelf } from "@/data/getSelf"
import Image from "next/image"

export const ApplicationHeader = async () => {
    const user = await getSelf()

    return(
        <>
            <header className="flex justify-between items-center bg-app-background py-2 px-3 sticky top-0 z-10">
                <Image src='/assets/logo.png' alt="" width={205} height={34}  />
                <div className="flex justify-center items-center gap-2">
                    {user ? (
                        <span>{user.name}</span>
                    ) : (
                        <SignInSignUpDrawer />
                    ) }
                </div>
            </header>
        </>
    ) 

}