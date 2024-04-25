import { User } from "@/shared/types/User"

export type LoginResponse = {
    accessToken: string
    user: User
}