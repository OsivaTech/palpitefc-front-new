import { QuizCard } from '@/components/quiz-card'
import { useAuth } from '@/context/useAuth'
import { getQuiz } from '@/http/pool'
import { Quiz } from '@/types/Quiz'
import { useEffect, useState } from 'react'

export const QuizGroup = () => {
  const [quiz, setQuiz] = useState<Quiz[]>()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const loadQuiz = async () => {
      const response = await getQuiz(isAuthenticated)
      setQuiz(response)
    }
    loadQuiz()
  }, [isAuthenticated])

  return (
    <div className=" space-y-2">
      {quiz?.map((q) => <QuizCard key={q.id} data={q} />)}
    </div>
  )
}
