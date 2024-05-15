'use server'

import { logout } from "@/lib/session";


export async function signout(){
    await logout()
}