import { Languages } from '../enums/languages/languages';
import { ILanguage, ILoggedIn, ILookups, IUserId } from '../interfaces/state/IState';

export const Language: ILanguage = {
  language: Languages.ENGLISH,
}
export const isLoggedIn: ILoggedIn = {
  isLoggedIn: false,
}
export const userId: IUserId = {
  userId: 1,
}
export const lookups: ILookups = {
  lookups: ["Miscellaneous"],
}
export const lessons: any[] = []
