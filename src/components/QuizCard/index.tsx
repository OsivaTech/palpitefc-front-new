import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Quiz } from "@/shared/types/Quiz"
import { Label } from "@radix-ui/react-select"
import { useState } from "react"


type QuizCardProps = {
    data: Quiz
}

export const QuizCard = ({data}: QuizCardProps) => {
    // const {value, setValue} = useState()
    return (
        <Card className="p-4 border boder-black  bg-transparent">
            <p className="text-white font-medium mb-6">{data.title}</p>
            <RadioGroup className="flex flex-col gap-9" onChange={evt => console.log(evt)}>
                {data.options.map(o => (
                    <div key={o.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={o.id} id={o.id} />
                        <span className="text-sm font-medium">{o.title}</span>
                    </div>
                ))}
            </RadioGroup>

        </Card>
    )
}