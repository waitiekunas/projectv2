import { getClassesByTopicFromBack, getClassesFieldFromBack } from '../backEnd/ClassesUtils';
import { Languages } from '../enums/languages/languages';
import { translations } from '../resources/translations/translations';

export const getTranslations = (language: Languages, label: string) => {
  let translation = translations.find(item => item.label === label)
  return translation ? translation.description[language] : "Place holder"
}

export const getLanguage = () => Languages.LITHUANIA

export const checkPasswordInput = (elementId: string, value: string) => {
  if (value && value.length < 15) {
    document.getElementById(elementId).setAttribute("style", "display: none")
    document.getElementById(elementId)
  } else {
    document.getElementById(elementId).setAttribute("style", "display: block")
  }
}

export const getClassesField = (field: string): Array<string> => {
  return getClassesFieldFromBack(field)
}

export const getClassesByTopic = (topic: string): Array<any> => {
  return getClassesByTopicFromBack(topic)
}
