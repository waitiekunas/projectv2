
export interface IRegisterInput {
    loginName: string
    password: string
    name: string
    surname: string
}

export interface IRegisterPayload {
    id: number
    loginName: string
    password: string
    name: string
    surname: string
    registerDate: string
    lastLoginDate: string
}