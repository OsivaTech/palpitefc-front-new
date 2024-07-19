'use client'

import { Separator } from '@radix-ui/react-separator'
import { useTranslations } from 'next-intl'

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
import { useTransition } from 'react'
import Image from 'next/image'

const Subscription = () => {
  const [isPending, startTransition] = useTransition()
  const t = useTranslations()

  const formSchema = z.object({
    numberCart: z.number(),
    expirationData: z.string(),
    securityCode: z.number(),
    nameCard: z.string(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const onSubmit = () => {
    startTransition(async () => {
      console.log('oi')
    })
  }

  return (
    <div className="max-w-[500px] mx-auto pt-10 px-3 bg-app-secondary">
      <h1 className="mb-4 text-center text-[15px] font-medium">
        {t('components.subscription.title')}
      </h1>
      <Separator className="mb-6 border border-white/50" />
      <h1 className="mb-4 text-center text-[20px] font-medium">
        {t('components.subscription.subtitle')}
      </h1>
      <li className="text-center text-[16px] font-medium">
        {t('components.subscription.list.0')}
      </li>
      <li className="text-center text-[16px] font-medium">
        {t('components.subscription.list.1')}
      </li>
      <li className="mb-[70px] text-center text-[16px] font-medium">
        {t('components.subscription.list.2')}
      </li>
      <h1 className="mb-[70px] text-center text-[20px] font-medium">
        {t('components.subscription.subtitle2')}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto space-y-8 max-w-[450px"
        >
          <FormField
            control={form.control}
            name="numberCart"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput
                    type="text"
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
