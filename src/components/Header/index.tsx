'use client'
import { Menu } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"

export const ApplicationHeader = () => {
    return <header className="flex justify-between items-center bg-app-background py-2 px-3 sticky top-0 z-10">
        <Image src='/assets/logo.png' alt="" width={205} height={34}  />
        <div className="flex justify-center items-center gap-2">
            <Button className="text-white" variant='link' onClick={() => alert('cadastrar')}>Cadastre-se</Button>
            <Menu />
        </div>
    </header>
}