import PollsPage from '@/components/polls'
import Title from '@/components/title'

export default async function PollsView() {
  return (
    <div className="mx-auto h-full w-full bg-[#00141C]">
      <section className="my-12">
        <Title title="Enquetes" />
      </section>
      <PollsPage />
    </div>
  )
}
