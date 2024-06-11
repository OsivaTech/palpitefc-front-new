export type SignupRequest = {
    name: string,
    email: string,
    password: string,
    document: string,
    teamId: number,
    info: string,
    phoneNumber: string,
    birthday: string
    gender: string
    address?: {
        street: string,
        number: string,
        complement: string,
        neighborhood: string,
        city: string,
        state: string,
        country: string,
        postalCode: string
    }
}