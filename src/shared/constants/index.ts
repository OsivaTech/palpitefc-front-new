
export const API_ROUTE = {
    login: `/api/signin`,
    getSelf: '/users/me',
    getFixture: '/fixtures',
    guesses: '/guesses',
    getMyGuesses: '/guesses/me',
    legues: '/leagues',
    getNews: '/news',
    getTeams: '/teams',
    signUp: '/signup',
    rankings:'/rankings/mock'
}

export const APP_LINKS = {
    HOMEPAGE: () => `/`,
    SIGNIN: () => `/signin`,
    SIGNUP: () => `/signup`
}

export const ROLE ={
    'ADMIN': 100,
    'JOURNALIST': 200,
    'USER': 300,
} as const