'use client'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { login } from "@/components/login-form/data"
import { APP_LINKS } from "@/constants"
import { useAuth } from "@/context/useAuth"
import { createUser } from "@/http/user"
import { Team } from "@/types/Team"
import { SignupRequest } from "@/types/api/resquests/SignupRequest"
import { DatePicker } from "@/components/date-picker"
import { Combobox } from "@/components/combobox"


export const RegisterForm = ({teams}:{teams: Team[]}) => {
    const t = useTranslations()
    const {push} = useRouter()
    const { toast } = useToast()
    const { registerUser} = useAuth()

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
        // street: z.string().min(2).max(50).optional(),
        // number: z.string().optional(),
        // complement: z.string().min(2).max(50).optional(),
        // city: z.string().min(2).max(50).optional(),
        // postalCode: z.string().min(2).max(50).optional(),
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
            // street: "",
            // number: "",
            // complement: "",
            // city: "",
            // postalCode: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const user:SignupRequest = {
            name: values.name,
            email: values.email,
            password: values.password,
            document: values.document,
            teamId: values.team,
            gender: values.gender,
            info: "",
            phoneNumber: values.phoneNumber,
            birthday: format(new Date(values.birthday), 'y-MM-dd'),
            // address: {
            //     street: values.street || '',
            //     number: values.number || '',
            //     complement: values.complement || '',
            //     neighborhood:  '',
            //     city: values.city || '',
            //     state: '',
            //     country: '',
            //     postalCode: values.postalCode || '',
            // }
        }

        try{
            await createUser(user);
            const response =  await login({email: user.email, password: user.password});
            
            if(response === false){
                toast({
                    title: t("common.error"),
                    description: t("pages.login.usernameOrPasswordWrong"),
                    variant: "destructive"
                  })
                  return;
            }

            const { accessToken, user:userResponse } = response;

            registerUser(userResponse)
            push(APP_LINKS.HOMEPAGE());
        }catch(error){
            console.log("erro", error)
            toast({
                title: t("common.error"),
                description: t("common.genericErrorMessage"),
                variant: "destructive"
              })

        }
    }

    return (
        <div className="max-w-[500px] mx-auto pt-10 px-3  ">
            <h1 className="mb-6 text-center text-xs font-medium">Cadastre-se e ganhe prêmios</h1>
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
                     {/* <h4 className="font-medium text-xs" >{t("common.address")}</h4>
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
                    /> */}
                    <CustomButton className="w-[267px] self-center" type="submit" >
                        {t("common.signIn")}
                    </CustomButton>
                </form>
            </Form>
        </div>

    )
}