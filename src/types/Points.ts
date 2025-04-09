import { Fixture } from './Fixture'
import { Guess } from './Guess'
import { League } from './League'

export type PointType = {
  code: string
  description: string
}

export type Point = {
  value: number
  type: PointType
}

export type Points = {
  guess: Guess
  fixture: Fixture
  league: League
  points: Point[]
}
