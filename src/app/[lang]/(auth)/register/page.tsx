import { getTeams } from "@/app/[lang]/(auth)/register/data"
import { RegisterForm } from "@/components/RegisterForm"

export default async function RegisterPage() {
    const teams = await getTeams();
    return (
        <main className="bg-[#2D3745] h-screen">
            <RegisterForm teams={teams} />
        </main>
    )
}