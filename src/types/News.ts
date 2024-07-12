export interface Author {
  id: number
  name: string
  team: string
}

export interface News {
  id: number
  title: string
  thumbnail: string
  content: string
  userId: number
  author: Author
  createdAt: string
  subtitle: string
}
