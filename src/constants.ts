export const APP_LINKS = {
  HOMEPAGE: () => `/`,
  SIGNIN: () => `/signin`,
  SIGNUP: () => `/signup`,
  FORGOT: () => `/forgot`,
  MYPOINTS: () => `/mypoints`,
  NEWS: () => `/news`,
}

export const ROLE = {
  ADMIN: 100,
  JOURNALIST: 200,
  USER: 300,
} as const

export const RANKING_TYPE = {
  YEAR: 'Year',
  MONTH: 'Month',
  LEAGUE: 'League',
}

export const POINT_TYPE: { [key: string]: string } = {
  ES: 'Placar exato',
  GD: 'Diferença de gols',
  MW: 'Vencedor da partida',
  EB: 'Palpite antecipado',
}
