import { Languages } from "../enums/languages/languages";

export default interface IAppState {
    app: IApp;
}
export interface IApp {
    language: Languages;
}