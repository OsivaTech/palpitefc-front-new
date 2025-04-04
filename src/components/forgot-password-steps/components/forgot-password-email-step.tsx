import { CustomInput } from '@/components/custom-input'
import {
  ForgotPasswordSteps,
  useForgotPassword,
} from '@/components/forgot-password-steps/context/forgot-password-context'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { sendForgotPasswordEmail } from '@/http/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ForgotPasswordEmailStep = () => {
  const [isPending, startTransition] = useTransition()
  const t = useTranslations()
  const { setData, setStep } = useForgotPassword()
  const { toast } = useToast()
  const formSchema = z.object({
    email: z.string().email(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await sendForgotPasswordEmail(values.email)
        setData({ email: values.email })
        setStep(ForgotPasswordSteps.CODE)
      } catch {
        toast({
          title: t('common.error'),
          description: t('common.invalidEmail'),
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto space-y-8 w-full"
      >
        <div className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput
                    label={t('pages.forgot.email.label')}
                    placeholder={t('common.email')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="secondary"
            isLoading={isPending}
            disabled={isPending}
            type="submit"
            className="self-center"
          >
            {t('components.forgotPasswordForm.submit')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
