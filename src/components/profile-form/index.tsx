import { Combobox } from "@/components/combobox"
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { DatePicker } from "@/components/date-picker"
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form"
import { Team } from "@/types/Team"
import { zodResolver } from "@hookform/resolvers/zod"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { format } from "date-fns"
import { useTranslations } from "next-intl"
import { Form, useForm } from "react-hook-form"
import { z } from "zod"

export const ProfileForm = ({teams}: {teams:Team[]}) => {
    const t = useTranslations()
    
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(2).max(50),
        name: z.string().min(2).max(50),
        document: z.string().min(2).max(50),
        team: z.number(),
        info: z.string().optional(),
        phoneNumber: z.string().min(2).max(50),
        birthday: z.date(),
        gender: z.enum(["m", "f", "o", ""]),
         street: z.string().min(2).max(50).optional(),
        number: z.string().optional(),
        complement: z.string().min(2).max(50).optional(),
        city: z.string().min(2).max(50).optional(),
        postalCode: z.string().min(2).max(50).optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            document: "",
            team: 0,
            info: "",
            phoneNumber: "",
            birthday: undefined,
            gender: "",
            street: "",
            number: "",
            complement: "",
            city: "",
            postalCode: "",
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    return (
        <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col  gap-3">
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
                                    <CustomInput placeholder="Telefone" {...field} />
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
                                    <CustomInput placeholder="CPF" {...field} />
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
                                                field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    "DATA DE NASCIMENTO"
                                                )
                                            }

                                            selected={field.value}
                                            onSelect={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }
                    }
                    />
                    <h4 className="font-medium text-xs" >{t("common.sex")}</h4>
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
                                                {t("common.male")}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                            <RadioGroupItem value="f" />
                                            </FormControl>
                                            <FormLabel className="font-medium text-xs">
                                            {t("common.female")}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                            <RadioGroupItem value="o" />
                                            </FormControl>
                                            <FormLabel className="font-medium text-xs">{t("common.other")}</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <h4 className="font-medium text-xs" >{t("common.favoriteTeam")}</h4>
                    <FormField
                        control={form.control}
                        name="team"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                   <Combobox
                                        onChange={field.onChange}
                                        value={field.value}
                                        data={teams.map(t => ({
                                                label: t.name,
                                                value: t.id,
                                                imageLink: t.image
                                        }))}
                                        errorLabel="Não foi encontrado esse time"
                                        searchLabel="Selecione seu time do coração"
                                    />

                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <h4 className="font-medium text-xs" >{t("common.address")}</h4>
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
                                <FormItem >
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
                                    <FormControl >
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
                    />
                    <CustomButton className="w-[267px] self-center" type="submit" >
                        {t("common.save")}
                    </CustomButton>
                </form>
            </Form>
    )
}