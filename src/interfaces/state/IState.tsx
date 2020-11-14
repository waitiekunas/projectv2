import { Languages } from '../../enums/languages/languages';

export interface ILanguage {
  language: Languages
}
export interface IUserState {
  isLoggedIn: boolean
  canUpload: boolean
  email: string
  subscribed: boolean
  stripeCustomerId: string
  subscriptionId: string
}
export interface IUserId {
  userId: number
}
export interface ILookups {
  lookups: string[]
}
