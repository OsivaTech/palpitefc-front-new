import { useTranslations } from 'next-intl'
import { PollGroup } from '../poll-group'
import { Separator } from '../ui/separator'

const PollsPage = () => {
  const t = useTranslations()
  return (
    <div className="max-w-[500px] mx-auto pt-4 px-6 mb-6 bg-app-secondary">
      <h1 className="mb-4 text-center text-[16px] font-medium">
        {t('polls.component.title')}
      </h1>
      <Separator className="mb-6 border border-white/50" />
      <PollGroup />
    </div>
  )
}

export default PollsPage
