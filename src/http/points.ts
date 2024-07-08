'use server'
import { get } from '@/lib/api'
import { MyPointsEndpoint } from '@/lib/endpoints'
import { PointsResponse } from '@/types/api/responses/PointsResponse'

export async function getMyPoints() {
  try {
    const response = await get(
      MyPointsEndpoint,
      {
        cache: 'no-cache',
      },
      true,
    )
    const myPoints: PointsResponse = await response?.json()

    return myPoints
  } catch (error) {
    console.log(error)
    return null
  }
}
