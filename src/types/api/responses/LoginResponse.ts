import { User } from "@/types/User"

export type LoginResponse = {
    accessToken: string
    user: User
}