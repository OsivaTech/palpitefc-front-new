'use server'
import { del, get, post, put } from '@/lib/api'
import { PoolsEndpoint, VoteEndpoint } from '@/lib/endpoints'
import { Poll } from '@/types/Poll'
import { PollResponse } from '@/types/api/responses/PollResponse'

export async function vote(pollId: number, optionId: string) {
  try {
    const request = await post(VoteEndpoint(pollId, optionId), {}, true)
    console.log(request)
    if (request === null) {
      return false
    }
    const vote: Poll = await request.json()
    return vote
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function getPolls(isLogged: boolean) {
  try {
    let response
    if (isLogged) {
      response = await get(PoolsEndpoint, {}, true)
    } else {
      response = await get(PoolsEndpoint, {}, false)
    }
    const quiz: PollResponse = await response!.json()
    return quiz
  } catch (error) {
    console.error('Error', error)
  }
}

export async function createPoll(poll: Poll) {
  try {
    const response = await post(
      PoolsEndpoint,
      {
        body: JSON.stringify(poll),
        method: 'POST',
      },
      true,
    )
    return response.ok
  } catch {
    return false
  }
}

export async function updatePoll(poll: Poll) {
  try {
    const response = await put(
      `${PoolsEndpoint}/${poll.id}`,
      {
        body: JSON.stringify(poll),
        method: 'PUT',
      },
      true,
    )
    return response.ok
  } catch {
    return false
  }
}

export async function deletePoll(pollId: number) {
  try {
    const response = await del(`${PoolsEndpoint}/${pollId}`, {}, true)
    return response.ok
  } catch {
    return false
  }
}
