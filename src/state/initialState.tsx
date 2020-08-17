import { Languages } from '../enums/languages/languages';
import { ILanguage, ILookups, IUserId, IUserState } from '../interfaces/state/IState';

export const Language: ILanguage = {
  language: Languages.LITHUANIA,
}
export const isLoggedIn: IUserState = {
  isLoggedIn: false,
  canUpload: false,
}
export const userId: IUserId = {
  userId: 1,
}
export const lookups: ILookups = {
  lookups: ["Miscellaneous"],
}
export const lessons: any[] = []
