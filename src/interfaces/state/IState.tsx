import { Languages } from '../../enums/languages/languages';

export interface ILanguage {
  language: Languages
}
export interface ILoggedIn {
  isLoggedIn: boolean
}
export interface IUserId {
  userId: number
}
export interface ILookups {
  lookups: string[]
}
