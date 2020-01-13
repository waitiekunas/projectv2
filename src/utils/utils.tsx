import { Languages } from "../enums/languages/languages";
import { TranslationItem } from "../interfaces/translations/ITranslations";

export const getTranslations = (arr: Array<TranslationItem>, language: Languages, label: string) => {
    let translations = arr.find(item => item.label === label);
    return translations ? translations.description[language] : "Button";
}

export const getLanguage = () => Languages.LITHUANIA;

export const checkPasswordInput = (elementId: string, value: string) => {
    if (value && value.length < 15) {
        document.getElementById(elementId).setAttribute('style', 'display: none')
        document.getElementById(elementId)
    } else {
        document.getElementById(elementId).setAttribute('style', 'display: block')
    }
}