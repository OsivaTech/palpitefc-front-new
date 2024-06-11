export type Guess= {
    fixtureId: number, 
    homeTeam: {
        id: number, 
        goals: number
    },
    awayTeam: {
        id: number, 
        goals: number
    }
}