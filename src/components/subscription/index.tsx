'use client'

import { Separator } from '@radix-ui/react-separator'
import { useLocale, useTranslations } from 'next-intl'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CustomInput } from '../custom-input'
import { CustomButton } from '../custom-button'
import { useEffect, useTransition } from 'react'
import Image from 'next/image'
import { encryptCard, usePagSeguro } from 'pagseguro-encryptcard-reactjs'
import { env } from '@/env'

import { Subscription as SubscriptionType } from '@/types/Subscription'

import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { onlyNumber } from '@/utils/mask'
import { makeSubscription } from '@/http/subscription'
import { removeCharacters } from '@/utils/removeCharacters'
import { useAuth } from '@/context/useAuth'
import { APP_LINKS } from '@/constants'

type CardProps = {
  numberCart: string
  expirationData: string
  securityCode: string
  nameCard: string
}
const Subscription = () => {
  const [isPending, startTransition] = useTransition()

  const publicKey = env.NEXT_PUBLIC_KEY_CARD_PAGSEGURO

  const t = useTranslations()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const locale = useLocale()

  const { toast } = useToast()

  const formSchema = z.object({
    numberCart: z
      .string()
      .transform(onlyNumber)
      .refine((val) => val.length > 12, {
        message: t('common.invalidCard'),
      }),

    expirationData: z
      .string()
      .transform((str) => removeCharacters(str, ['_', '/']))
      .refine((val) => val.length === 6, {
        message: t('common.invalidExpirationData'),
      }),

    securityCode: z.string().min(1, {
      message: t('common.invalidSecurityCode'),
    }),
    nameCard: z.string().min(1, {
      message: t('common.invalidNameCard'),
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberCart: '',
      expirationData: '',
      securityCode: '',
      nameCard: '',
    },
  })

  const functionEncryCard = async (values: CardProps) => {
    const month = values.expirationData.substring(0, 2)
    const year = values.expirationData.substring(2, 6)

    if (pagseguro) {
      const card = {
        publicKey,
        holder: values.nameCard,
        number: values.numberCart,
        expMonth: month,
        expYear: year,
        securityCode: values.securityCode,
      }
      const result = await encryptCard(pagseguro, card)
      return result
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/${APP_LINKS.SIGNIN()}`)
    }
  }, [isAuthenticated, locale, router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await functionEncryCard(values)

      const body = {
        card: {
          encrypted: result?.encryptedCard,
          securityCode: values.securityCode,
        },
      } as SubscriptionType

      const resultSubscription = await makeSubscription(body)

      if (!resultSubscription) {
        toast({
          title: 'Erro',
          description: t('common.subscriptionError'),
          variant: 'destructive',
        })
        return
      }
      toast({
        title: 'Sucesso',
        description: t('common.successSubscription'),
        variant: 'default',
      })

      router.refresh()
    })
  }

  const pagseguro = usePagSeguro()

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3 bg-app-secondary">
      <h1 className="mb-4 text-center text-[16px] font-medium">
        {t('components.subscription.title')}
      </h1>
      <Separator className="mb-6 border border-white/50" />
      <h1 className="mb-4 text-center text-lg font-medium">
        {t('components.subscription.subtitle')}
      </h1>
      <div className="flex flex-col gap-4 px-4 text-center">
        <p>
          Você pode ganhar até R$ 2.000, por mês no pix! Assine agora o Palpite
          VIP, por apenas R$ 9,99/mês.
        </p>
        <div className="gap-2">
          <p className="font-bold">Prêmios semanais:</p>
          <ul className="text-center">
            <li>🥇 R$ 250,00 para o 1º lugar</li>
            <li>🥈 R$ 150,00 para o 2º lugar</li>
            <li>🥉 R$ 100,00 para o 3º lugar</li>
          </ul>
        </div>
      </div>
      <h1 className="my-6 text-center text-lg font-medium">
        {t('components.subscription.subtitle2')}
      </h1>

      <h1 className="text-center mb-2">
        Insira os dados do seu cartão de crédito:
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto space-y-4 max-w-[450px]"
        >
          <FormField
            control={form.control}
            name="numberCart"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput
                    type="text"
                    mask="9999 9999 9999 9999"
                    placeholder={t('components.subscription.form.numberCart')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row w-full justify-between">
            <div className="w-[48%]">
              <FormField
                control={form.control}
                name="expirationData"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        type="text"
                        mask="99/9999"
                        placeholder={t(
                          'components.subscription.form.expirationData',
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[48%]">
              <FormField
                control={form.control}
                name="securityCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        type="text"
                        placeholder={t(
                          'components.subscription.form.securityCode',
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="nameCard"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput
                    type="text"
                    placeholder={t('components.subscription.form.nameCard')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center w-full ">
            <CustomButton
              isLoading={isPending}
              disabled={isPending}
              type="submit"
              className="w-[247px] bg-app-secondary hover:bg-secondary/80"
            >
              {t('components.subscription.form.button')}
            </CustomButton>
          </div>
        </form>
      </Form>

      <div className="mt-[80px]  flex items-center justify-items-center flex-col">
        <Image
          className="self-center mb-2"
          src={'/assets/certificate.svg'}
          height={20}
          width={20}
          alt=""
        />

        <h1 className="mb-4 text-center text-[12px] font-medium w-44">
          Compra protegida, seus dados estão seguros
        </h1>
      </div>
      <Separator className="mt-[84px]  border border-white/50" />
    </div>
  )
}

export default Subscription
