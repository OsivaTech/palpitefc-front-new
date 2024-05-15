'use server'
import { api } from "@/data/api";
import { API_ROUTE } from "@/shared/constants";
import { User } from "@/shared/types/User";
import { TeamResponse } from "@/shared/types/api/responses/TeamsResponse";

export async function getTeams(){
    const response = await api(API_ROUTE.getTeams, {
        method: 'GET'
    })
    const teams: TeamResponse = await response.json();

    return teams;
}

