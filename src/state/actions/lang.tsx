import { Languages } from "../../enums/languages/languages";
import { GET_LANGUAGE } from "./actions";

export const getLanguage = (language: Languages) => ({
    type: GET_LANGUAGE, language
})