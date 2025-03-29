import { NewsTabContent } from '@/components/news/components/newspage'
import { getNews } from '@/http/news'

export default async function NewsPage() {
  const news = await getNews()
  if (!news) {
    return <div>No news found</div>
  }

  return (
    <div className="mx-auto h-full w-full bg-[#00141C]">
      <NewsTabContent data={news} />
    </div>
  )
}
