export type League = {
  id: number
  name: string
  image: string
  country: string
  enabled: boolean
  category: {
    type: number
    description: string
  }
}
