import { QuizCard } from '@/components/quiz-card'
import { useAuth } from '@/context/useAuth'
import { getPolls } from '@/http/poll'
import { Poll } from '@/types/Poll'
import { useEffect, useState } from 'react'

export const QuizGroup = () => {
  const [quiz, setQuiz] = useState<Poll[]>()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const loadQuiz = async () => {
      const response = await getPolls(isAuthenticated)
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
