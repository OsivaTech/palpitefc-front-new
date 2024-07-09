import { CustomButton } from '@/components/custom-button'
import {
  ForgotPasswordSteps,
  useForgotPassword,
} from '@/components/forgot-password-steps/context/forgot-password-context'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { sendForgotPasswordEmail, verifyCode } from '@/http/user'
import { cn } from '@/lib/utils'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Loader2 } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'

export const ForgotPasswordCodeStep = () => {
  const [code, setCode] = useState('')
  const [isPending, startTransition] = useTransition()
  const [isResendPending, startResendTransition] = useTransition()
  const { data, setStep, setData } = useForgotPassword()
  const [hasError, setHasError] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const handleVerifyCode = () => {
    startTransition(async () => {
      if (!data?.email) return
      const result = await verifyCode(data?.email, code)
      if (result) {
        setData({ ...data, code })
        setStep(ForgotPasswordSteps.RESET)
      } else {
        setHasError(true)
      }
    })
  }

  useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000)
  }, [countdown])

  const handleResendCode = () => {
    startResendTransition(async () => {
      if (!data?.email) return
      await sendForgotPasswordEmail(data.email)
      setCountdown(60)
    })
  }

  return (
    <div className="flex flex-col gap-2 w-60 mx-auto">
      <InputOTP
        containerClassName="justify-center"
        className="border-red-500 border"
        maxLength={6}
        onChange={(value) => setCode(value)}
        value={code}
        pattern={REGEXP_ONLY_DIGITS}
        disabled={isPending}
      >
        <InputOTPGroup>
          <InputOTPSlot
            index={0}
            className={cn('bg-app-background', hasError && 'border-red-500')}
          />
          <InputOTPSlot
            index={1}
            className={cn('bg-app-background', hasError && 'border-red-500')}
          />
          <InputOTPSlot
            index={2}
            className={cn('bg-app-background', hasError && 'border-red-500')}
          />
          <InputOTPSlot
            index={3}
            className={cn('bg-app-background', hasError && 'border-red-500')}
          />
          <InputOTPSlot
            index={4}
            className={cn('bg-app-background', hasError && 'border-red-500')}
          />
          <InputOTPSlot
            index={5}
            className={cn('bg-app-background', hasError && 'border-red-500')}
          />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center flex flex-col gap-2">
        <span className="text-sm">Enviamos um código para seu email. </span>
        {countdown > 0 ? (
          <span className="text-sm">Enviar novamene em {countdown}s </span>
        ) : (
          <button
            disabled={isResendPending}
            className="text-sm underline flex gap-2 justify-center w-full items-center"
            onClick={handleResendCode}
          >
            {isResendPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>Reenviar código</>
            )}
          </button>
        )}
      </div>
      <CustomButton
        isLoading={isPending}
        disabled={isPending}
        onClick={handleVerifyCode}
      >
        Verificar
      </CustomButton>
    </div>
  )
}
