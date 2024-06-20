'use client'
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { Separator } from "@radix-ui/react-separator"


export const ForgotPasswordForm = () => {
    return (
        <>
            <h1 className="mb-4 text-center text-[16px] font-medium">Esqueci minha senha</h1>
            <Separator className="mb-6 border border-white/50" />
            <CustomInput />
            <CustomButton > Enviar Código </CustomButton>
        </>
    )
}