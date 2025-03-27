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
import { login } from '@/components/login-form/data'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/context/useAuth'
import { APP_LINKS } from '@/constants'
import Link from 'next/link'
import { useEffect, useTransition } from 'react'
import { Button } from '../ui/button'

export const LoginForm = () => {
  const t = useTranslations()
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const { registerUser } = useAuth()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('reset')) {
      toast({
        title: 'Sucesso',
        description: 'Senha resetada com sucesso',
      })
    }
  }, [searchParams, toast])

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
          const redirectUrl =
            searchParams.get('redirect') || APP_LINKS.HOMEPAGE()
          router.push(redirectUrl)
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
    <div className="max-w-[500px] mx-auto pt-10 px-3">
      <h1 className="mb-6 max-w-44 font-bold text-xl text-app-secondary">
        Que bom que você voltou
      </h1>
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
                  <CustomInput placeholder="email@exemplo.com" {...field} />
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
                  <CustomInput
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-8">
            <Link
              className="self-left text-sm font-bold text-app-secondary"
              href={`/${locale}/${APP_LINKS.FORGOT()}`}
            >
              {t('pages.login.forgotPassword')}
            </Link>

            <Button
              isLoading={isPending}
              disabled={isPending}
              variant="secondary"
              type="submit"
              className="self-center"
            >
              {t('common.signIn')}
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex flex-col align-center justify-center gap-2 mt-3">
        <span className="self-center text-sm font-normal">
          {t('pages.login.dontHaveAccount')}
          <Link
            className="text-sm font-bold ml-1 text-app-secondary"
            href={`/${locale}/${APP_LINKS.SIGNUP()}`}
          >
            {t('pages.login.registerHere')}
          </Link>
        </span>
      </div>
    </div>
  )
}
