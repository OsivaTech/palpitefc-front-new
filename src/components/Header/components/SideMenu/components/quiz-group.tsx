import { QuizCard } from "@/components/QuizCard"
import { Quiz } from "@/shared/types/Quiz"


type QuizGroupProps = {
    data: Quiz[]
}
export const QuizGroup = ({data}: QuizGroupProps) => {

    return (
        <div className="flex flex-col gap-2 overflow-scroll">
            {data?.map(q => (
                <QuizCard key={q.id} data={q} />
            ))}
        </div>
    )
}