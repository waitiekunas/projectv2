import mockData from '../mockData/users/users.json'
import { IRegisterInput } from '../interfaces/loginRegister/IRegister.jsx';

declare var require: any
export const loginUser = ({ username, password }) => {
    return backEndLogin(username, password)
}

const backEndLogin = (username: string, password: string): boolean => {
    return mockData.filter(user =>
        user.loginName === username && user.password === password
    ).length > 0;

}
export const registerUser = (userData: IRegisterInput): boolean => {
    return backEndRegister(userData)
}

const backEndRegister = (userData: IRegisterInput): boolean => {
    const alreadyExists = checkIfUserExists(userData)
    if (alreadyExists) {
        return false
    } else {
        let newUser = returnNewUser(userData)
        addNewUser(newUser)
        return true
    }
}
const checkIfUserExists = (userData: IRegisterInput): boolean => {
    return mockData.filter(user =>
        user.loginName === userData.loginName
    ).length > 0;
}

export const createISODateString = () => {
    return new Date().toISOString()
}
const createUserId = () => {
    let number = Math.floor(Math.random() * 1000000).toString()
    let numberLength = number.length
    const zero = '0'
    while (numberLength < 6) {
        number = zero.concat(number)
        numberLength = number.length
    }
    return number
}
const returnNewUser = (userData: IRegisterInput): IRegisterInput => {
    let user = userData
    user.id = createUserId()
    user.registerDate = createISODateString()
    debugger
    return user;
}
const addNewUser = (user: IRegisterInput) => {
    let users = JSON.parse(mockData)
    users.push(user)
    let json = JSON.stringify(users)
    const writeJsonFile = require('write-json-file')
        (async () => {
            await writeJsonFile('../mockData/users/users.json', json)
        })
    console.log(mockData)
}
//TODO: Update user

