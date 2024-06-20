import { EditForm } from "@/components/edit-form";
import { APP_LINKS } from "@/constants";
import { getTeams } from "@/http/team";
import { getSelf } from "@/http/user";
import { redirect } from "next/navigation";


export default async function Profile() {
    const teams = await getTeams();
    const user = await getSelf();

    if(!user) {
        redirect(APP_LINKS.SIGNIN())
        return
    }

    return (
        <div className="mx-auto max-w-[1600px] h-full w">
            <EditForm teams={teams} user={user}  />
        </div>
    )
}