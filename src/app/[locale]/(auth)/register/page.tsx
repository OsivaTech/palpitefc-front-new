import { getTeams } from "@/app/[locale]/(auth)/register/data"
import { RegisterForm } from "@/components/RegisterForm"

export default async function RegisterPage({params: {locale}}: {params: {locale: any}}) {
    
    const teams = await getTeams();
    return (
        <main className="bg-[#2D3745] h-screen">
            <RegisterForm teams={teams} />
        </main>
    )
}