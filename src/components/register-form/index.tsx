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
    email: z.string().email(),
    password: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    document: z
      .string()
      .transform(onlyNumber)
      .refine((val) => val.length >= 11, {
        message: t('pages.register.error.document'),
      }),
    team: z.number(),
    info: z.string().optional(),
    phoneNumber: z
      .string()
      .transform(onlyNumber)
      .refine((val) => val.length >= 11, {
        message: t('pages.register.error.phoneNumber'),
      }),
    birthday: z.date(),
    gender: z.enum(['m', 'f', 'o', '']),
  })

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
                  <CustomInput placeholder="Nome" {...field} />
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
                <FormControl>
                  <CustomInput placeholder="Senha" type="password" {...field} />
                </FormControl>

                <FormMessage />
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

                <FormMessage />
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

                <FormMessage />
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

                <FormMessage />
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
                  <FormMessage />
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
                <FormMessage />
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

                <FormMessage />
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
