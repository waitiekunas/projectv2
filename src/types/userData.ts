export type LoginData = {
    username:string;
    password:string;
}

export type RegisterBody={
    userData:RegisterData
}

export type RegisterData = {
    id: string
    loginName: string
    password: string
    registerDate: string
    lastLoginDate: string
    email: string
}