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
import { useTranslations } from 'next-intl'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { format } from 'date-fns'
import { CustomInput } from '@/components/custom-input'
import { Team } from '@/types/Team'
import { SignupRequest } from '@/types/api/resquests/SignupRequest'
import { DatePicker } from '@/components/date-picker'
import { Combobox } from '@/components/combobox'
import { User } from '@/types/User'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-select'
import { updateUser } from '@/http/user'
import { useTransition } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/context/useAuth'
import Image from 'next/image'

export const EditForm = ({ teams, user }: { teams: Team[]; user?: User }) => {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const { forceReload } = useAuth()

  const formSchema = z.object({
    allowMarketing: z.boolean().optional(),
    email: z.string().email(),
    name: z.string().min(2).max(50),
    document: z.string().min(2).max(50),
    team: z.number().optional().nullable(),
    info: z.string().optional(),
    phoneNumber: z.string().min(2).max(50),
    birthday: z.date().transform((value) => new Date(value)),
    gender: z.enum(['M', 'F', 'O', '']),
    // street: z.string().min(2).max(50),
    // number: z.string(),
    // complement: z.string().max(50),
    // city: z.string().min(2).max(50),
    // postalCode: z.string().min(2).max(50),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      document: user?.document || '',
      team: user?.team.id || 0,
      info: user?.info || '',
      phoneNumber: user?.phoneNumber || '',
      birthday: user?.birthday ? new Date(user?.birthday) : undefined,
      gender: user?.gender || '',
      // street: user?.address?.street || '',
      // number: user?.address?.number || '',
      // complement: user?.address?.complement || '',
      // city: user?.address?.city || '',
      // postalCode: user?.address?.postalCode || '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const user: Omit<SignupRequest, 'password'> = {
        name: values.name,
        email: values.email,
        document: values.document,
        teamId: values?.team || 0,
        gender: values?.gender,
        info: values.info || '',
        phoneNumber: values.phoneNumber,
        birthday: format(new Date(values.birthday), 'y-MM-dd'),
        allowMarketing: values.allowMarketing || false,
        // address: {
        //   street: values.street || '',
        //   number: values.number || '',
        //   complement: values.complement || '',
        //   neighborhood: '',
        //   city: values.city || '',
        //   state: '',
        //   country: '',
        //   postalCode: values.postalCode || '',
        // },
      }
      if (await updateUser(user)) {
        forceReload()
        toast({
          title: t('Sucesso'),
          description: t('Usuário atualizado com sucesso'),
          variant: 'default',
        })
      } else {
        toast({
          title: t('common.error'),
          description: t('Não foi possível atualizar o usuário'),
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div className="max-w-[500px] mx-auto pt-6 px-6">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={user?.team.image || '/placeholder-image.png'}
          alt=""
          width={200}
          height={200}
          className="object-cover"
        />
        <h1 className="mb-4 text-center text-lg font-bold text-app-secondary">
          {user?.name}
        </h1>
      </div>
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
                  <CustomInput label="Nome" {...field} />
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
                  <CustomInput label="Email" {...field} />
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
                  <CustomInput label="Telefone" {...field} />
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
                  <CustomInput label="CPF" {...field} />
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
                      placeholder="DATA DE NASCIMENTO"
                      label="Data de Nascimento"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
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
                        <RadioGroupItem value="M" />
                      </FormControl>
                      <FormLabel className="font-medium text-xs">
                        {t('common.male')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="F" />
                      </FormControl>
                      <FormLabel className="font-medium text-xs">
                        {t('common.female')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="O" />
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

          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    label={t('common.favoriteTeam')}
                    onChange={field.onChange}
                    value={field.value!}
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
          {/* <h4 className="font-medium text-xs">{t('common.address')}</h4>
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput placeholder="Rua" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-between w-full">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput placeholder="Número" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <CustomInput placeholder="Complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput placeholder="CEP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput placeholder="Cidade" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button
            className="w-60 self-center mb-4 uppercase"
            variant="secondary"
            type="submit"
            disabled={isPending}
            isLoading={isPending}
          >
            {t('common.update')}
          </Button>
        </form>
      </Form>
      <Separator className="mb-4 border border-white/50" />
      <Button variant="primary" className="mb-6 w-40" disabled>
        {t('common.removeMyAccount')}
      </Button>
    </div>
  )
}
