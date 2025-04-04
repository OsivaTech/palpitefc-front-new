import { MainMatchCard } from '@/components/main-match-list/components/main-match-card'
import { getFixtureFeatured } from '@/http/fixture'

export const MainMatchList = async () => {
  const fixtures = await getFixtureFeatured()

  return (
    <div className="flex flex-srink gap-4 overflow-x-auto pl-4">
      {fixtures?.map((fixture) => (
        <MainMatchCard key={fixture.id} fixture={fixture} />
      ))}
    </div>
  )
}
