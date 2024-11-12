'use client'

import { PollCard } from '@/components/poll-card'
import { useAuth } from '@/context/useAuth'
import { getPolls } from '@/http/poll'
import { Poll } from '@/types/Poll'
import { useEffect, useState } from 'react'

export const PollGroup = () => {
  const [poll, setPoll] = useState<Poll[]>()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const loadPoll = async () => {
      const response = await getPolls(isAuthenticated)
      setPoll(response)
    }
    loadPoll()
  }, [isAuthenticated])

  return (
    <div className="space-y-4">
      {poll?.map((q) => <PollCard key={q.id} data={q} />)}
    </div>
  )
}
