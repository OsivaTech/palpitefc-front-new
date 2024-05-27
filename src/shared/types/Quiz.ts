export type Quiz = {
    id: string
    title: string
    options: QuizOptions[]
}

export type QuizOptions = {
    id: string
    title: string
    count: string
    pollId: string
}