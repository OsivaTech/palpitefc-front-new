import { RegisterForm } from '@/components/register-form'
import { getTeams } from '@/http/team'

export default async function RegisterPage() {
  const teams = await getTeams()

  return (
    <div className="bg-[#00141C]">
      <RegisterForm teams={teams} />
    </div>
  )
}
