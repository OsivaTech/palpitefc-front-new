import AdvertisementsManagement from '@/components/admin/advertisements/indes'
import { getAdvertisement } from '@/http/advertisement'

export default async function AdvertisementsManagementPage() {
  const advertisements = await getAdvertisement()

  return (
    <div className="mx-auto h-full w-full bg-app-secondary">
      <AdvertisementsManagement advertisements={advertisements} />
    </div>
  )
}
