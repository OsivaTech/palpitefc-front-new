export const API_ROUTE = {
    login: `/api/signin`,
    getSelf: '/api/auth/user',
    getFixture: '/fixture'
}

export const ROLE ={
    'ADMIN': 100,
    'JOURNALIST': 200,
    'USER': 300,
} as const