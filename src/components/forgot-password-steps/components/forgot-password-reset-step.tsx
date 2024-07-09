import { CustomButton } from '@/components/custom-button'
import { CustomInput } from '@/components/custom-input'
import { useForgotPassword } from '@/components/forgot-password-steps/context/forgot-password-context'
import { useToast } from '@/components/ui/use-toast'
import { APP_LINKS } from '@/constants'
import { updatePassword } from '@/http/user'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export const ForgotPasswordResetStep = () => {
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const { data } = useForgotPassword()
  const router = useRouter()
  const locale = useLocale()

  const handleResetPassword = () => {
    if (newPassword !== repeatNewPassword) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem',
        variant: 'destructive',
      })
      return
    }
    startTransition(async () => {
      if (!data || !data.email || !data.code) return
      const res = await updatePassword({
        ...data,
        password: newPassword,
      })
      if (res) {
        const newUrl = `/${locale}/${APP_LINKS.SIGNIN()}?reset=true`
        router.push(newUrl)
      } else {
        toast({
          title: 'Erro',
          description: 'Erro ao resetar a senha',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <CustomInput
        value={newPassword}
        onChange={(evt) => setNewPassword(evt.currentTarget.value)}
        type="password"
        placeholder="Nova senha"
      />
      <CustomInput
        value={repeatNewPassword}
        onChange={(evt) => setRepeatNewPassword(evt.currentTarget.value)}
        type="password"
        placeholder="Repita a nova senha"
      />
      <CustomButton
        isLoading={isPending}
        disabled={isPending}
        onClick={handleResetPassword}
      >
        Salvar
      </CustomButton>
    </div>
  )
}
