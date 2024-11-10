export type PollOption = {
  id: number
  title: string
  count: number
  pollId: number
}

export type Poll = {
  id: number
  title: string
  yourVote?: number
  options: PollOption[]
}
