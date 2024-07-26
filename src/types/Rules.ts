export type RulesProps = {
  id: number
  name: string
  complement: string
  description: string
}

export type Rules = {
  title: string
  type: string
  rules: RulesProps[]
}
