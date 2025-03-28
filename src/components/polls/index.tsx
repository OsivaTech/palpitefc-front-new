import { useTranslations } from 'next-intl'
import { PollGroup } from '../poll-group'

const PollsPage = () => {
  const t = useTranslations()
  return (
    <div className="max-w-[500px] mx-auto pt-4 px-2 mb-6">
      <h1 className="mb-4 text-lg font-bold text-app-secondary">
        {t('polls.component.title')}
      </h1>
      <PollGroup />
    </div>
  )
}

export default PollsPage
