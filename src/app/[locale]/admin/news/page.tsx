import NewsManagement from '@/components/admin/news'
import { getNews } from '@/http/news'

export default async function NewsManagementPage() {
  const news = await getNews()

  return (
    <div className="mx-auto h-full w-full bg-[#2D3745]">
      <NewsManagement news={news} />
    </div>
  )
}
