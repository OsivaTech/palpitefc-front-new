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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { CustomButton } from '@/components/custom-button'
import { CustomInput } from '@/components/custom-input'
import { login } from '@/components/login-form/data'
import { APP_LINKS } from '@/constants'
import { useAuth } from '@/context/useAuth'
import { createUser } from '@/http/user'
import { Team } from '@/types/Team'
import { SignupRequest } from '@/types/api/resquests/SignupRequest'
import { DatePicker } from '@/components/date-picker'
import { Combobox } from '@/components/combobox'
import Link from 'next/link'
import React, { useTransition } from 'react'
import { onlyNumber } from '@/utils/mask'

export const RegisterForm = ({ teams }: { teams: Team[] }) => {
  const t = useTranslations()
  const { push, refresh } = useRouter()
  const { toast } = useToast()
  const { registerUser } = useAuth()
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  const formSchema = z.object({
    email: z
      .string()
      .email({ message: t('pages.register.error.emailInvalid') }),
    password: z
      .string()
      .min(6, { message: t('pages.register.error.password') })
      .max(50),
    name: z
      .string()
      .min(2, { message: t('pages.register.error.name') })
      .max(50),
    document: z
      .string()
      .transform(onlyNumber)
      .refine((val) => val.length >= 11, {
        message: t('pages.register.error.document'),
      })
      .refine((val) => isValidCPF(val), {
        message: t('pages.register.error.documentInvalid'),
      }),
    team: z.number(),
    info: z.string().optional(),
    phoneNumber: z
      .string()
      .transform(onlyNumber)
      .refine((val) => val.length >= 11, {
        message: t('pages.register.error.phoneNumber'),
      }),
    birthday: z.date({ message: t('pages.register.error.birthday') }).refine(
      (val) => {
        const today = new Date()
        const eighteenYearsAgo = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate(),
        )
        return val <= eighteenYearsAgo
      },
      {
        message: t('pages.register.error.ageRestriction'),
      },
    ),
    gender: z.enum(['m', 'f', 'o', '']),
  })

  function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11) return false
    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    )
      return false
    let sum = 0
    let remainder
    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.substring(9, 10))) return false
    sum = 0
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.substring(10, 11))) return false
    return true
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      document: '',
      team: 0,
      info: '',
      phoneNumber: '',
      birthday: undefined,
      gender: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user: SignupRequest = {
      name: values.name,
      email: values.email,
      password: values.password,
      document: onlyNumber(values.document),
      teamId: values.team,
      gender: values.gender,
      info: '',
      phoneNumber: onlyNumber(values.phoneNumber),
      birthday: format(new Date(values.birthday), 'y-MM-dd'),
    }
    startTransition(async () => {
      try {
        await createUser(user)

        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          window.fbq('track', 'CompleteRegistration')
        } else {
          console.warn('Facebook Pixel não está carregado corretamente')
        }

        const response = await login({
          email: user.email,
          password: user.password,
        })

        if (response === false) {
          toast({
            title: t('common.error'),
            description: t('pages.login.usernameOrPasswordWrong'),
            variant: 'destructive',
          })
          return
        }

        const { user: userResponse } = response

        registerUser(userResponse)
        refresh()
        push(APP_LINKS.HOMEPAGE())
      } catch (error) {
        console.log('erro', error)
        toast({
          title: t('common.error'),
          description: t('common.genericErrorMessage'),
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3  ">
      <h1 className="mb-6 text-center text-xs font-medium">
        Cadastre-se e ganhe prêmios
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col  gap-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput placeholder="Nome Completo" {...field} />
                </FormControl>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput placeholder="Senha" type="password" {...field} />
                </FormControl>

                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput placeholder="Email" {...field} />
                </FormControl>

                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput
                    placeholder="Telefone"
                    mask="(99) 99999-9999"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput
                    placeholder="CPF"
                    mask="999.999.999-99"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      label={
                        field.value
                          ? format(field.value, 'PPP')
                          : 'DATA DE NASCIMENTO'
                      }
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="text-white" />
                </FormItem>
              )
            }}
          />
          <h4 className="font-medium text-xs">{t('common.sex')}</h4>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="m" />
                      </FormControl>
                      <FormLabel className="font-medium text-xs">
                        {t('common.male')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="f" />
                      </FormControl>
                      <FormLabel className="font-medium text-xs">
                        {t('common.female')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="o" />
                      </FormControl>
                      <FormLabel className="font-medium text-xs">
                        {t('common.other')}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />

          <h4 className="font-medium text-xs">{t('common.favoriteTeam')}</h4>
          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    onChange={field.onChange}
                    value={field.value}
                    data={teams.map((t) => ({
                      label: t.name,
                      value: t.id,
                      imageLink: t.image,
                    }))}
                    errorLabel="Não foi encontrado esse time"
                    searchLabel="Selecione seu time do coração"
                  />
                </FormControl>

                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center items-center bg-[#1C2026] h-[124px] rounded-md pt-6 pb-4">
            <CustomButton
              isLoading={isPending}
              disabled={isPending}
              className="mb-3 w-[267px] self-center bg-[#2D3745] hover:bg-[#2D3745] "
              type="submit"
            >
              {t('common.register')}
            </CustomButton>
            <span className="text-sm font-normal text-center">
              Ao clicar em cadastrar, você declara estar de acordo com os{' '}
            </span>
            <span className="text-sm font-normal text-center">
              <Link
                className="underline"
                href="https://assets.palpitefutebolclube.com/terms.html"
                target="_blank"
              >
                termos de uso
              </Link>
              {` e com a `}
              <Link
                className="underline"
                href="https://assets.palpitefutebolclube.com/privacy-policy.html"
                target="_blank"
              >
                política de privacidade
              </Link>
              .
            </span>
          </div>
          <Link
            className=" self-center text-sm font-normal underline"
            href={`/${locale}/${APP_LINKS.SIGNIN()}`}
          >
            Já sou cadastrado
          </Link>
        </form>
      </Form>
    </div>
  )
}
