'use server'

import { api } from "@/data/api";
import { logout } from "@/lib/session";
import { API_ROUTE } from "@/shared/constants";
import { QuizResponse } from "@/shared/types/api/responses/QuizResponse";


export async function signout(){
    await logout()
}

export async function getQuiz(){
    try{
        const response = await api(API_ROUTE.quiz)
        console.log(response)
        const quiz: QuizResponse = await response.json()

        return quiz
    }catch(error){
        console.error('Error', error)
    }
}

export async function setQuiz(){

}