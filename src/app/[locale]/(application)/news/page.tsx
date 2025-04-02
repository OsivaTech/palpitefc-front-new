import { NewsTabContent } from '@/components/news/components/newspage'
import Title from '@/components/title'
import { getNews } from '@/http/news'

export default async function NewsPage() {
  const news = await getNews()
  if (!news) {
    return <div>No news found</div>
  }

  return (
    <div className="mx-auto h-full w-full bg-[#00141C]">
      <section className="my-12">
        <Title title="Notícias" />
      </section>
      <NewsTabContent data={news} />
    </div>
  )
}
