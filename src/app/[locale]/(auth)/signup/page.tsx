import { RegisterForm } from '@/components/register-form'
import { getTeams } from '@/http/team'

export default async function RegisterPage() {
  const teams = await getTeams()

  return (
    <div className="bg-[#2D3745] h-[calc(100vh-50px)] ">
      <RegisterForm teams={teams} />
    </div>
  )
}
