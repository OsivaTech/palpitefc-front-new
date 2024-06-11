'use client'
import { ModalPageHeader } from "@/components/modal-page-header";
import { QuizGroup } from "@/components/quiz-group";
import { Separator } from "@/components/ui/separator";
import { usePageModal } from "@/context/usePageModal";
import { logout } from "@/lib/session";
import { User } from "@/types/User";


export const ModalPageQuiz = ({user}: {user: User}) => {
    const { closePageModal} = usePageModal();

  
    return (
        <>
            <ModalPageHeader user={user} />
            <Separator className="my-6 border border-white/50" />
            <QuizGroup />
        </>
    );
}