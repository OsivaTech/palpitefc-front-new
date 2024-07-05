import { Fixture } from '@/types/Fixture'
import { Guess } from '@/types/Guess'
import { League } from '@/types/League'
import { Match } from '@/types/Match'
import { ChangeEventHandler } from 'react'

export type GuessForm = { homeTeam: string; awayTeam: string }

export type GuessCardContentType = {
  match: Match
  reverse?: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  value?: GuessForm
  disabled?: boolean
}

export type GuessCardProps = {
  fixture: Fixture
  guess: Guess | undefined
  league: League
}
