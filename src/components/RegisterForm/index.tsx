'use client'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/components/LoginForm/data"
import { useTranslations } from "next-intl"
import { CustomInput } from "@/components/CustomInput/custom-input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePicker } from "@/components/DatePicker/date-picker"
import { CustomButton } from "@/components/CustomButton/custon-button"
import { format } from "date-fns"
import { Combobox } from "@/components/Combobox/combobox"
import { Team } from "@/shared/types/Team"

export const RegisterForm = ({teams}:{teams: Team[]}) => {
    const t = useTranslations()
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(2).max(50),
        name: z.string().min(2).max(50),
        document: z.string().min(2).max(50),
        team: z.string().min(2).max(50),
        info: z.string().min(2).max(50),
        phoneNumber: z.string().min(2).max(50),
        birthday: z.date(),
        sex: z.enum(["male", "female", "other", ""]),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            document: "",
            team: "",
            info: "",
            phoneNumber: "",
            birthday: null,
            sex: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const user = await login(values)
        console.log(user)
    }

    return (
        <div className="container flex flex-col justify-center pt-4">
            <h1 className="mb-6 text-center text-xs font-medium">Cadastre-se e ganhe prêmios</h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-3">
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
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <DatePicker
                                        label={
                                            field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                "Pick a date"
                                            )
                                        }
                                        selected={field.value}
                                        onSelect={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <h4 className="font-medium text-xs" >{t("common.sex")}</h4>
                    <FormField
                        control={form.control}
                        name="sex"
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
                                            <RadioGroupItem value="male" />
                                            </FormControl>
                                            <FormLabel className="font-medium text-xs">
                                                {t("common.male")}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                            <RadioGroupItem value="female" />
                                            </FormControl>
                                            <FormLabel className="font-medium text-xs">
                                            {t("common.female")}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                            <RadioGroupItem value="other" />
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
                        name="birthday"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                   <Combobox 
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
                    <CustomButton className="w-[267px]" type="submit" >
                        {t("common.signIn")}
                    </CustomButton>
                </form>
            </Form>
        </div>

    )
}