import { ILanguage, ILoggedIn } from '../interfaces/state/IState'
import { Languages } from "../enums/languages/languages";


export const Language: ILanguage = {
    language: Languages.ENGLISH
}
export const isLoggedIn: ILoggedIn = {
    isLoggedIn: false
}