import { User } from "@/types/User";
import { z } from "zod";

export const registerFormSchema = {
    email: z.string().email(),
    password: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    document: z.string().min(2).max(50),
    team: z.number().optional().nullable(),
    info: z.string().optional(),
    phoneNumber: z.string().min(2).max(50),
    birthday: z.date().transform((value) => new Date(value)),
    gender: z.string(),
}

export const editFormSchema = {
    email: z.string().email(),
    password: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    document: z.string().min(2).max(50),
    team: z.number().optional().nullable(),
    info: z.string().optional(),
    phoneNumber: z.string().min(2).max(50),
    birthday: z.date().transform((value) => new Date(value)),
    gender: z.string(),
    street: z.string().min(2).max(50).optional(),
    number: z.string().optional(),
    complement: z.string().min(2).max(50).optional(),
    city: z.string().min(2).max(50).optional(),
    postalCode: z.string().min(2).max(50).optional(),
}

export const editDefualtForm = (user:User) => ({
    name: user?.name ||  "",
    email: user?.email ||  "",
    password: "",
    document: user?.document ||  "",
    team: parseInt(user?.team.id ?? "0"),
    info: user?.info ||  "",
    phoneNumber: user?.phoneNumber ||  "",
    birthday: user?.birthday ? new Date(user?.birthday) : undefined,
    gender: user?.gender ||  "",
    street: "",
    number: "",
    complement: "",
    city: "",
    postalCode: "",
})

export const registerDefualtForm = () => ({
    name: "",
    email: "",
    password: "",
    document: "",
    team: 0,
    info: "",
    phoneNumber: "",
    birthday: undefined,
    gender: "",
    
})
