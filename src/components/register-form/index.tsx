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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { CustomInput } from '@/components/custom-input'
import { APP_LINKS } from '@/constants'
import { useAuth } from '@/context/useAuth'
import { createUser } from '@/http/user'
import { Team } from '@/types/Team'
import { SignupRequest } from '@/types/api/resquests/SignupRequest'
import { Combobox } from '@/components/combobox'
import Link from 'next/link'
import { useTransition, useEffect, useState } from 'react'
import { onlyNumber } from '@/utils/mask'
import { Button } from '../ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useCookies } from 'next-client-cookies'
import { createSession } from '@/lib/session'

export const RegisterForm = ({ teams }: { teams: Team[] }) => {
  const t = useTranslations()
  const { push } = useRouter()
  const { toast } = useToast()
  const { registerUser } = useAuth()
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()
  const utmSource = useSearchParams().get('utm_source')
  const cookies = useCookies()
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  useEffect(() => {
    if (utmSource && !cookies.get('utm_source')) {
      cookies.set('utm_source', utmSource)
    }
  }, [cookies, utmSource])

  const formSchema = z
    .object({
      email: z
        .string()
        .email({ message: t('pages.register.error.emailInvalid') }),
      password: z
        .string()
        .min(6, { message: t('pages.register.error.password') })
        .max(50),
      confirmPassword: z.string(),
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
      team: z.number().refine((val) => val > 0, {
        message: t('pages.register.error.team'),
      }),
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
      gender: z.enum(['m', 'f', 'o']).refine((val) => val !== undefined, {
        message: t('pages.register.error.genderRequired'),
      }),
      marketingConsent: z.boolean().optional(),
      privacyPolicyAccepted: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
          message: t('pages.register.error.privacyPolicyAccepted'),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('pages.register.error.passwordMatch'),
      path: ['confirmPassword'],
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
      confirmPassword: '',
      document: '',
      team: 0,
      info: '',
      phoneNumber: '',
      birthday: undefined,
      gender: undefined,
      marketingConsent: false,
      privacyPolicyAccepted: false,
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
      allowMarketing: values.marketingConsent ?? false,
    }
    startTransition(async () => {
      try {
        const userResponse = await createUser(user)

        if ('code' in userResponse) {
          toast({
            title: t('common.error'),
            description: t('apiMessages.' + userResponse.code),
            variant: 'destructive',
          })
          return
        }

        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          window.fbq('track', 'CompleteRegistration')
        } else {
          console.warn('Facebook Pixel não está carregado corretamente')
        }

        registerUser(userResponse.user)
        createSession(userResponse.accessToken)

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
    <div className="max-w-[500px] mx-auto pt-10 px-3">
      <h1 className="mb-6 text-xl font-bold max-w-48 text-app-secondary">
        Olá, vamos começar seu cadastro
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
                  <CustomInput
                    label="Nome completo"
                    placeholder="Nome Completo"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput
                    label="Email"
                    placeholder="email@exemplo.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput
                    label="Criar senha"
                    placeholder="**********"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput
                    label="Confirmar senha"
                    placeholder="**********"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-700" />
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
                    label="Telefone"
                    placeholder="(11) 12345-6789"
                    mask="(99) 99999-9999"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-700" />
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
                    label="CPF"
                    placeholder="123.456.789-10"
                    mask="999.999.999-99"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => {
              const handleDateChange = (
                newDay: string,
                newMonth: string,
                newYear: string,
              ) => {
                if (newDay && newMonth && newYear) {
                  const date = new Date(
                    parseInt(newYear),
                    parseInt(newMonth),
                    parseInt(newDay),
                  )
                  if (!isNaN(date.getTime())) {
                    form.setValue('birthday', date)
                  }
                }
              }

              const months = [
                { label: 'Jan', value: 1 },
                { label: 'Fev', value: 2 },
                { label: 'Mar', value: 3 },
                { label: 'Abr', value: 4 },
                { label: 'Mai', value: 5 },
                { label: 'Jun', value: 6 },
                { label: 'Jul', value: 7 },
                { label: 'Ago', value: 8 },
                { label: 'Set', value: 9 },
                { label: 'Out', value: 10 },
                { label: 'Nov', value: 11 },
                { label: 'Dez', value: 12 },
              ]

              return (
                <FormItem>
                  <FormControl>
                    <div>
                      <label className="text-sm">Data de nascimento</label>
                      <div className="flex gap-4">
                        <CustomInput
                          placeholder="Dia"
                          type="number"
                          maxLength={2}
                          max={31}
                          min={1}
                          className="w-1/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={day}
                          onChange={(e) => {
                            const newDay = e.target.value
                            setDay(newDay)
                            handleDateChange(newDay, month, year)
                          }}
                        />
                        <Select
                          onValueChange={(value) => {
                            setMonth(value)
                            handleDateChange(day, value, year)
                          }}
                          {...field}
                          value={month}
                        >
                          <SelectTrigger className="text-xs border-0 border-b-[2px] border-white/70 h-[33px] bg-transparent rounded-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0">
                            <SelectValue placeholder="Mês" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Mês</SelectLabel>
                              <div className="grid grid-cols-4 gap-1">
                                {months.map((month) => (
                                  <SelectItem
                                    key={month.value}
                                    value={month.value.toString()}
                                  >
                                    {month.label}
                                  </SelectItem>
                                ))}
                              </div>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <CustomInput
                          placeholder="Ano"
                          type="number"
                          maxLength={4}
                          className="w-1/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={year}
                          onChange={(e) => {
                            const newYear = e.target.value
                            setYear(newYear)
                            handleDateChange(day, month, newYear)
                          }}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )
            }}
          />
          <h4 className="font-medium text-sm">{t('common.sex')}</h4>
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
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    onChange={field.onChange}
                    label="Time do coração"
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

                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marketingConsent"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row gap-2">
                    <Checkbox
                      id="marketingConsent"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="marketingConsent"
                      className="text-sm font-normal"
                    >
                      Desejo receber novidades e promoções
                    </label>
                  </div>
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacyPolicyAccepted"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row items-start gap-2">
                    <Checkbox
                      id="privacyPolicyAccepted"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="privacyPolicyAccepted"
                      className="text-sm font-normal"
                    >
                      Confirmo que tenho 18 anos ou mais, aceito os{' '}
                      <Link
                        className="text-app-secondary font-bold"
                        href={`/${locale}/${APP_LINKS.TERMS()}`}
                        target="_blank"
                      >
                        termos de uso
                      </Link>
                      {` e a `}
                      <Link
                        className="text-app-secondary font-bold"
                        href={`/${locale}/${APP_LINKS.PRIVACYPOLICY()}`}
                        target="_blank"
                      >
                        política de privacidade
                      </Link>{' '}
                      reconheço a proibição de acesso de terceiros à minha conta
                      e autorizo o monitoramento dos meus dados pelo site e pela
                      Secretaria de Prêmios e Apostas do Ministério da Fazenda.
                    </label>
                  </div>
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />

          <Button
            isLoading={isPending}
            disabled={isPending}
            variant="secondary"
            className="self-center w-full h-10 uppercase"
            type="submit"
          >
            {t('common.signUp')}
          </Button>
          <div className="flex justify-center items-center gap-1">
            <span className="text-sm font-normal text-center">
              Já tem uma conta?
            </span>
            <Link
              className=" self-center text-sm font-bold text-app-secondary"
              href={`/${locale}/${APP_LINKS.SIGNIN()}`}
            >
              Entrar
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
