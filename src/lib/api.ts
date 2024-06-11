'use server'
import { decrypt } from "@/lib/session";
import { JWTPayload } from "jose";
import { cookies } from "next/headers";

async function withAuth(requestInit: RequestInit): Promise<RequestInit> {
    const session = cookies().get('session');
    const token = await decrypt(session?.value) as JWTPayload & { token: string };
    if (!token?.token) {
        return requestInit
    }
    
    const headers = {
        ...requestInit.headers,
        Authorization: `Bearer ${token.token}`,
    };
    return {
        ...requestInit,
        headers,
    };
}

export async function get(url: string, requestInit: RequestInit, useAuth: boolean) {
    if (useAuth) {
        requestInit = await withAuth(requestInit);
    }
    return fetch(url, { ...requestInit  ,method: 'GET', headers: { ...requestInit.headers, 'Content-Type': 'application/json' } });
}

export async function post(url: string, requestInit: RequestInit, useAuth: boolean) {
    if (useAuth) {
        requestInit = await withAuth(requestInit);
    }
   
    return fetch(url, {
        ...requestInit, 
        method: 'POST', 
        headers: { 
            ...requestInit.headers, 
            'Content-Type': 'application/json' 
        }
    });
}

export async function put(url: string, requestInit: RequestInit, useAuth: boolean) {
    if (useAuth) {
        requestInit = await withAuth(requestInit);
    }
    return fetch(url, { ...requestInit, method: 'PUT', headers: { ...requestInit.headers, 'Content-Type': 'application/json' }});
}

export async function del(url: string, requestInit: RequestInit, useAuth: boolean) {
    if (useAuth) {
        requestInit = await withAuth(requestInit);
    }
    return fetch(url, { ...requestInit, method: 'DELETE', headers: { ...requestInit.headers, 'Content-Type': 'application/json'}});
}