'use server'
import { del, get, post, put } from '@/lib/api'
import { NewsEndpoint } from '@/lib/endpoints'
import { NewsResponse } from '@/types/api/responses/NewsResponse'
import { News } from '@/types/News'

export async function getNews() {
  try {
    const response = await get(NewsEndpoint, {}, false)
    const news: NewsResponse = await response.json()

    return news
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function createNews(news: News) {
  try {
    const response = await post(
      NewsEndpoint,
      {
        method: 'POST',
        body: JSON.stringify(news),
      },
      true,
    )

    return response.ok
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function updateNews(news: News) {
  try {
    const response = await put(
      `${NewsEndpoint}/${news.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(news),
      },
      true,
    )

    return response.ok
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function deleteNews(id: number) {
  try {
    const response = await del(
      `${NewsEndpoint}/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
      true,
    )

    return response.ok
  } catch (error) {
    console.log(error)
    return false
  }
}
