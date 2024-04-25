import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { login } from "@/components/LoginForm/data"

export const LoginForm = () => {
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
        const user = await login(values)
        console.log(user)
    }

    return (
        <div className="container">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input className="text-black" placeholder="Email" {...field} />
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
                                <Input className="text-black" placeholder="Senha" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" >Login</Button>
                </form>
            </Form>
        </div>

    )
}