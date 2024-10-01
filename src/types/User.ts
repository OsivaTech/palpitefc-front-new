import { Team } from '@/types/Team'

export interface User {
  id: string
  name: string
  email: string
  role: number
  points: number
  birthday: string
  phoneNumber: string
  document: string
  info: string
  team: Team
  gender: 'M' | 'F' | 'O' | ''
  isSubscribed: boolean
  address: {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: number
    country: number
    postalCode: string
  }
}
