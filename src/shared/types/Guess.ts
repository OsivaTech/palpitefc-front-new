export type Guess= {
    fixtureId: number, 
    homeTeam: {
        id: number, 
        goal: number
    },
    awayTeam: {
        id: number, 
        goal: number
    }
}