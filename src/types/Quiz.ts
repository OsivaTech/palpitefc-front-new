export type Quiz = {
    id: number
    title: string
    yourVote?: number
    options: QuizOptions[]
}

export type QuizOptions = {
    id: number
    title: string
    count: number
    pollId: number
}