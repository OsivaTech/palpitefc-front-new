import NewsPage from '@/components/news'
import { getNews } from '@/http/news'

export default async function NewPage({ params }: { params: { id: string } }) {
  const news = await getNews()
  const selectedNews = news?.find((n) => n.id === Number(params.id))

  return (
    <div className="mx-auto bg-app-secondary">
      <NewsPage news={selectedNews || null} />
    </div>
  )
}
