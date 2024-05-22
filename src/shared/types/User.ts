import { Team } from "@/shared/types/Team"

export type User = {
    id: number
    name: string
    email: string
    role: number
    points: number
    birthday: string
    phoneNumber: string
    info: string
    team: Team
    address: {
        street: string,
        number: string,
        complement: string,
        neighborhood: string,
        city: string,
        state: number,
        country: number,   
    }
}