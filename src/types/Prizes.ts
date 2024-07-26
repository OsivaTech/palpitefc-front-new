export type prize = {
  id: number
  placing: number
  description: string
  prize: string
  type: string
}

export type Prizes = {
  title: string
  period: string
  prizes: prize[]
}
