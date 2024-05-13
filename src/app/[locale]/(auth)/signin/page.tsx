import { LoginForm } from "@/components/LoginForm";

export default async function RegisterPage({params: {locale}}: {params: {locale: any}}) {
    return (
        <main className="bg-[#2D3745] h-screen">
            <LoginForm />
        </main>
    )
}