'use client'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { CustomInput } from "@/components/custom-input"
import { CustomButton } from "@/components/custom-button"
import { login } from "@/components/login-form/data"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/useAuth"
import { APP_LINKS } from "@/constants"

export const LoginForm = () => {
    const t = useTranslations()
    const router = useRouter()
    const { toast } = useToast()
    const { registerUser } = useAuth()
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(2).max(50),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            const response = await login(values)
            if(response){
                registerUser(response.user)
                router.push(APP_LINKS.HOMEPAGE())
            }else{
                toast({
                    title: "Erro",
                    description: t("common.invalidCredentials"),
                    variant: "destructive",
                })
            }

        } catch{
            console.error("error")
        }
    }

    return (
        <div className="max-w-[500px] mx-auto pt-10 px-3  ">
            <h1 className="text-center mb-6 font-medium text-sm">Login</h1>
            <Form {...form} >
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="mx-auto space-y-8 max-w-[450px">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <CustomInput className="dark:bg-white dark:text-black" placeholder="Email" {...field} />
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
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <CustomInput type="password" className="dark:bg-white dark:text-black" placeholder="Senha" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <CustomButton type="submit"  >{t("common.signIn")}</CustomButton>
                </form>
            </Form>
        </div>

    )
}