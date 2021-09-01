import { IRegisterInput } from "../interfaces/loginRegister/IRegister.jsx"
import { users } from "../mockData/users/users"

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
  return users.filter(user => user.loginName === userData.loginName).length > 0
}

export const createISODateString = () => {
  return new Date().toISOString()
}
const createUserId = () => {
  let number = Math.floor(Math.random() * 1000000).toString()
  let numberLength = number.length
  const zero = "0"
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
  return user
}
const addNewUser = (user: IRegisterInput) => {
  users.push(user)
}

export const checkIfUserNotEmpty = (user: IRegisterInput) => {
  if (user.loginName && user.password) {
    return true
  } else {
    return false
  }
}

//TODO: Update user
