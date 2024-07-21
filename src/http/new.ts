'use server'
import { get } from '@/lib/api'
import { NewsEndpoint } from '@/lib/endpoints'
import { NewsResponse } from '@/types/api/responses/NewsResponse'

export async function getNews() {
  try {
    const response = await get(NewsEndpoint, { cache: 'no-cache' }, false)
    const news: NewsResponse = await response.json()

    return news
  } catch (error) {
    console.log(error)
    return null
  }
}
