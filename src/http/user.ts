'use server'
import { get, post } from "@/lib/api"
import { RegisterEndpoint, SelfEndpoint } from "@/lib/endpoints";
import { User } from "@/types/User";
import { SignupRequest } from "@/types/api/resquests/SignupRequest";

export const getSelf = async () => {
    try{
        const response = await get(SelfEndpoint, {}, true);
        const user: User = await response.json();
        return user;
    }catch{
        return null;
    }
}

export async function createUser(user: SignupRequest){
    await post(RegisterEndpoint, {
        method: 'POST',
        body: JSON.stringify(user)
    },false)
}