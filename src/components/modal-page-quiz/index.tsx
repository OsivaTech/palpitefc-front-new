
import { ModalPageHeader } from "@/components/modal-page-header";
import { QuizGroup } from "@/components/quiz-group";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/User";


export const ModalPageQuiz = ({user}: {user: User}) =>  
    <>
        <div>
            <ModalPageHeader user={user} />
            <Separator className="my-6 border border-white/50" />
        </div>
        <QuizGroup />
    </>