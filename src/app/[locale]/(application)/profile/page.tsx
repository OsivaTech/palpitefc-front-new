import { EditForm } from '@/components/edit-form'
import { APP_LINKS } from '@/constants'
import { getTeams } from '@/http/team'
import { getSelf } from '@/http/user'
import { redirect } from 'next/navigation'

export default async function Profile() {
  const teams = await getTeams()
  const user = await getSelf()

  if (!user) {
    redirect(APP_LINKS.SIGNIN())
    return
  }

  return (
    <div className="mx-auto bg-app-secondary w-full h-full">
      <EditForm teams={teams} user={user} />
    </div>
  )
}
