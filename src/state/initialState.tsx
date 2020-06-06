import { Languages } from '../enums/languages/languages';
import { ILanguage, ILoggedIn, IUserId } from '../interfaces/state/IState';

export const Language: ILanguage = {
  language: Languages.ENGLISH,
}
export const isLoggedIn: ILoggedIn = {
  isLoggedIn: false,
}
export const userId: IUserId = {
  userId: 1,
}
