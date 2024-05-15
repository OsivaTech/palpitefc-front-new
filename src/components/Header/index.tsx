import { ActionMenu } from "@/components/Header/components/ActionMenu/action-menu"
import { getSelf } from "@/data/getSelf"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"


type ApplicationHeaderType = {
    hideMenu?: boolean
}
export const ApplicationHeader = async ({hideMenu}: ApplicationHeaderType) => {
    const user = await getSelf()

    return(
        <>
            <header className={cn("flex justify-between items-center bg-app-background py-2 px-3 sticky top-0 z-10", hideMenu && "justify-center")}>
                <Link href={'/'}>
                    <Image src='/assets/logo.png' alt="" width={205} height={34}  />
                </Link>
                {!hideMenu && (
                    <ActionMenu />
                )}
                
            </header>
        </>
    ) 

}