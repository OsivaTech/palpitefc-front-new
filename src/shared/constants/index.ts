export const API_ROUTE = {
    login: `/api/signin`,
    getSelf: '/api/user',
    getFixture: '/fixtures',
    guesses: '/guesses',
    getMyGuesses: '/guesses/me',
    legues: '/leagues'
}

export const ROLE ={
    'ADMIN': 100,
    'JOURNALIST': 200,
    'USER': 300,
} as const