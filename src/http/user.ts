'use server'
import { get, post } from "@/lib/api"
import { RegisterEndpoint, SelfEndpoint, UpdateUser } from "@/lib/endpoints";
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
    try{
        console.log()
        await post(RegisterEndpoint, {
            method: 'POST',
            body: JSON.stringify(user)
        },false)
        return true
    }catch{
        return false
    }
}
export async function updateUser(user: SignupRequest){
    try{
        await post(UpdateUser, {
            method: 'POST',
            body: JSON.stringify(user)
        },false)
        return true
    }catch{
        return false
    }
}
