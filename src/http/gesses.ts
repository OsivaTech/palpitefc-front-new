'use server'
import { get, post } from '@/lib/api'
import { GuessEndpoint, MyGuessEndpoint } from '@/lib/endpoints'
import { GuessesRequest } from '@/types/api/resquests/GuessesRequest'
import { Guess } from '@/types/Guess'

export async function getMyGuesses(date?: string) {
  try {
    const response = await get(
      date ? `${MyGuessEndpoint}?date=${date}` : MyGuessEndpoint,
      {
        cache: 'no-cache',
      },
      true,
    )

    const responseStatus = response?.status
    if (responseStatus === 401) {
      return null
    }

    const myGuesses: Guess[] = await response?.json()

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
