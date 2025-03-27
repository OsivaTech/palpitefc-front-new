'use server'
import { get, post } from '@/lib/api'
import { GuessEndpoint, MyGuessEndpoint } from '@/lib/endpoints'
import { GuessesRequest } from '@/types/api/resquests/GuessesRequest'
import { Guess } from '@/types/Guess'

export async function getMyGuesses() {
  try {
    const response = await get(
      MyGuessEndpoint,
      {
        cache: 'no-cache',
      },
      true,
    )
    const myGuesses: Guess[] = await response?.json()

    console.log(myGuesses)

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
