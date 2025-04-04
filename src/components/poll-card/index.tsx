import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { APP_LINKS } from '@/constants'
import { useAuth } from '@/context/useAuth'
import { usePageModal } from '@/context/usePageModal'
import { vote } from '@/http/poll'
import { Poll, PollOption } from '@/types/Poll'
import { CircleCheck } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type PollCardProps = {
  data: Poll
}

export const PollCard = ({ data }: PollCardProps) => {
  const [value, setValue] = useState<string>()
  const [alreadyVoted, setAlreadyVoted] = useState(false)
  const { isAuthenticated } = useAuth()

  const { closePageModal } = usePageModal()

  const router = useRouter()
  const locale = useLocale()

  useEffect(() => {
    if (data.yourVote) {
      setAlreadyVoted(true)
    }
  }, [data.yourVote])

  const handleVote = async () => {
    if (!isAuthenticated) {
      router.push(`/${locale}/${APP_LINKS.SIGNIN()}`)
      return closePageModal()
    }
    if (!value) {
      return false
    }
    await vote(data.id, value)
    setAlreadyVoted(true)
  }

  return (
    <Card className="p-4 border border-app-secondary bg-[#232323]/40">
      <div className="flex flex-row space-between gap-2 items-center justify-between">
        <p className="text-white font-normal">{data.title}</p>
        <Image
          src="/assets/capa-small.png"
          alt=""
          width={150}
          height={150}
          className="object-cover aspect-square rounded-[30px]"
        />
      </div>

      <RadioGroup
        className="flex flex-col gap-4 mt-4"
        defaultValue={value}
        onValueChange={(evt) => setValue(evt)}
      >
        {data.options.map((o) => (
          <React.Fragment key={o.id}>
            {alreadyVoted ? (
              <div>
                <span className="text-sm font-medium flex items-center gap-2">
                  {o.title}
                  {data.yourVote && o.id === data?.yourVote && (
                    <CircleCheck size={16} />
                  )}
                </span>
                <ProgressItem
                  key={o.id}
                  options={data.options}
                  currentOptions={o}
                  votedId={value || '0'}
                />
              </div>
            ) : (
              <div key={o.id} className="flex items-center space-x-2">
                <RadioGroupItem value={o.id.toString()} id={o.id.toString()} />
                <span className="text-sm font-medium">{o.title}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </RadioGroup>
      {!alreadyVoted && (
        <div className="flex items-center justify-end w-full gap-2">
          <Button
            className="py-1 px-3 text-sm font-medium uppercase"
            disabled={!value}
            onClick={handleVote}
            variant="secondary"
          >
            VOTAR
          </Button>
        </div>
      )}
    </Card>
  )
}

const ProgressItem = ({
  options,
  currentOptions,
  votedId,
}: {
  options: PollOption[]
  currentOptions: PollOption
  votedId: string
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!options && !currentOptions) return
    const totalCount = options
      ?.map((o) => o.count)
      .reduce((acc, curr) => acc + curr, 0)

    const result = Math.floor((currentOptions?.count * 100) / totalCount)
    if (isNaN(result) && currentOptions.id.toString() === votedId)
      setProgress(100)
    else if (isNaN(result)) setProgress(0)
    else setProgress(result)
  }, [currentOptions, currentOptions?.count, options, votedId])

  return (
    <div>
      <div className="flex gap-2 items-center">
        <Progress value={progress} /> {progress}%
      </div>
    </div>
  )
}
