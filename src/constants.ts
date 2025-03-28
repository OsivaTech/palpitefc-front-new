export const APP_LINKS = {
  HOMEPAGE: () => ``,
  SIGNIN: () => `signin`,
  SIGNUP: () => `signup`,
  FORGOT: () => `forgot`,
  MYPOINTS: () => `mypoints`,
  NEWS: () => `news`,
  SUBSCRIPTION: () => `subscription`,
  SUBSCRIPTIONCANCEL: () => `subscription/cancel`,
  RULES: () => `rules`,
  PROFILE: () => `profile`,
  POLLS: () => `polls`,
  PRIVACYPOLICY: () => `privacy-policies`,
  TERMS: () => `terms`,
}

export const APP_LINKS_ADMIN = {
  ADMIN_PANEL: () => `/admin`,
  ADMIN_POLLS: () => `/admin/polls`,
  ADMIN_NEWS: () => `/admin/news`,
  ADMIN_TEAMS: () => `/admin/teams`,
  ADMIN_LEAGUES: () => `/admin/leagues`,
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
  WEEK: 'Week',
  WEEKVIP: 'WeekVip',
}

export const POINT_TYPE: { [key: string]: string } = {
  ES: 'Placar exato',
  GD: 'Diferença de gols',
  MW: 'Vencedor da partida',
  EB: 'Palpite antecipado',
}

export const TYPE_PREMIUM = {
  CASH: 'cash',
}

export const MATCH_STATUS = {
  IN_PLAY: ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT', 'LIVE'],
  FINISHED: ['FT', 'AET', 'PEN'],
  SCHEDULED: ['TBD', 'NS'],
  NOT_PLAYED: ['AWD', 'WO'],
  ABANDONED: ['ABD'],
  CANCELLED: ['CANC'],
  POSTPONED: ['PST'],
}

export enum LEAGUE_CATEGORY {
  BRASIL,
  INTERNATIONAL,
}
