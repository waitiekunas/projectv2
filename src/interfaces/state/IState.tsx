import { Languages } from '../../enums/languages/languages';

export interface ILanguage {
  language: Languages
}
export interface IUserState {
  isLoggedIn: boolean
  canUpload: boolean
}
export interface IUserId {
  userId: number
}
export interface ILookups {
  lookups: string[]
}
