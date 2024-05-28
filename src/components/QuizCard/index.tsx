import { vote } from "@/components/QuizCard/data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Quiz, QuizOptions } from "@/shared/types/Quiz"
import { CircleCheck } from "lucide-react"
import { useEffect, useState } from "react"


type QuizCardProps = {
    data: Quiz
}

export const QuizCard = ({data}: QuizCardProps) => {
    const [value, setValue] = useState<string>()
    const [alreadyVoted, setAlreadyVoted] = useState(false)

    useEffect(() => {
        if(data.yourVote){
            setAlreadyVoted(true)
        }
    }, [data.yourVote])
    
    const handleVote = async () => {
        if(!value){
            return false;
        }

        await vote(data.id, value)
        setAlreadyVoted(true)
    }
    console.log(data)
    return (
        <Card className="p-4 border boder-black  bg-transparent">
            <p className="text-white font-medium mb-6">{data.title}</p>
            <RadioGroup className="flex flex-col gap-4" defaultValue={value} onValueChange={evt => setValue(evt)} >
                {data.options.map(o => (
                    <>
                        {alreadyVoted ? (
                            <div>
                                <span className="text-sm font-medium flex items-center gap-2">
                                    {o.title} 
                                    {data.yourVote && o.id === data?.yourVote && (<CircleCheck size={16} />)} 
                                </span>
                                <ProgressItem key={o.id} options={data.options} currentOptions={o} />
                            </div>
                        ) : (
                            <div key={o.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={o.id.toString()} id={o.id.toString()}  />
                                <span className="text-sm font-medium">{o.title}</span>
                            </div>
                        )}
                    </>
                ))}
            </RadioGroup>
            {!alreadyVoted && (
                <div className="flex items-center justify-end w-full gap-2 mt-3">
                    <Button className="h-[22px] py-1 px-3 text-sm font-bold uppercase" disabled={!value} onClick={handleVote}>VOTAR</Button>
                </div>
            )}
        </Card>
    )
}

const ProgressItem = ({options, currentOptions}: {options: QuizOptions[], currentOptions: QuizOptions}) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if(!options && !currentOptions ) return 
        
        const totalCount = options?.map(o => o.count).reduce((acc,curr) => acc + curr, 0)
        const result = Math.floor((currentOptions?.count * 100) / totalCount)
        setProgress(result)
    }, [currentOptions, currentOptions?.count, options])


    return (
        <div>
            <div className="flex gap-2 items-center">
                <Progress value={progress}  /> {progress}%
            </div>
        </div>
    )
    
}