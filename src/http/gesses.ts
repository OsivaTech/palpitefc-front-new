'use server'
import { get, post } from '@/lib/api'
import { GuessEndpoint, MyGuessEndpoint } from '@/lib/endpoints'
import { GuessResponse } from '@/types/api/responses/GessResponse'
import { GuessesRequest } from '@/types/api/resquests/GuessesRequest'

export async function getMyGuesses() {
  try {
    const response = await get(
      MyGuessEndpoint,
      {
        cache: 'no-cache',
      },
      true,
    )
    const myGuesses: GuessResponse = await response?.json()

    return myGuesses
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function makeAGuess(guess: GuessesRequest) {
  try {
    await post(
      GuessEndpoint,
      {
        body: JSON.stringify(guess),
        method: 'POST',
      },
      true,
    )
    return true
  } catch (error) {
    return false
  }
}
