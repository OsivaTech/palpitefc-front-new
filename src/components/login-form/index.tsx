'use client'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { CustomInput } from '@/components/custom-input'
import { CustomButton } from '@/components/custom-button'
import { login } from '@/components/login-form/data'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/context/useAuth'
import { APP_LINKS } from '@/constants'
import Link from 'next/link'
import { useTransition } from 'react'
import { Separator } from '@radix-ui/react-separator'

export const LoginForm = () => {
  const t = useTranslations()
  const router = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const { registerUser } = useAuth()
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2).max(50),
  })
  const locale = useLocale()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const response = await login(values)
        if (response) {
          registerUser(response.user)
          router.push(APP_LINKS.HOMEPAGE())
        } else {
          toast({
            title: 'Erro',
            description: t('common.invalidCredentials'),
            variant: 'destructive',
          })
        }
      } catch {
        console.error('error')
      }
    })
  }

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3  ">
      <h1 className="text-center mb-6 font-medium text-sm">Faça seu login</h1>
      <Separator className="mb-6 border border-white/50" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto space-y-8 max-w-[450px"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('pages.login.login')}</FormLabel>
                <FormControl>
                  <CustomInput placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('pages.login.password')}</FormLabel>
                <FormControl>
                  <CustomInput type="password" placeholder="Senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton
            isLoading={isPending}
            disabled={isPending}
            type="submit"
          >
            {t('common.signIn')}
          </CustomButton>
        </form>
      </Form>
      <div className="flex flex-col align-center justify-center gap-2 mt-3">
        <span className="self-center text-sm font-normal">
          {t('pages.login.dontHaveAccount')}
          <Link
            className=" text-sm font-normal underline ml-1"
            href={`/${locale}/${APP_LINKS.SIGNUP()}`}
          >
            {t('pages.login.registerHere')}
          </Link>
        </span>
        <Link
          className="self-center text-sm font-normal underline"
          href={`/${locale}/${APP_LINKS.FORGOT()}`}
        >
          {t('pages.login.forgotPassword')}
        </Link>
      </div>
    </div>
  )
}
