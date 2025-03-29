import { NewsTabContent } from '@/components/news/components/newspage'
import { getNews } from '@/http/news'

export default async function NewsPage() {
  const news = await getNews()
  if (!news) {
    return <div>No news found</div>
  }

  return <NewsTabContent data={news} />
}
