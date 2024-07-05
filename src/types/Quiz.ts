export type QuizOptions = {
  id: number
  title: string
  count: number
  pollId: number
}

export type Quiz = {
  id: number
  title: string
  yourVote?: number
  options: QuizOptions[]
}
