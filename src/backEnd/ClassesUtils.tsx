import { classes } from "../mockData/classDescriptions/classes"
import { classMaterial } from "../mockData/classDescriptions/classMaterial"

export const getClassesFieldFromBack = (field: string): Array<string> => {
  let allValues = Array.from(classes, value => {
    return value[field]
  })
  return Array.from(new Set(allValues))
}

export const getClassMaterials = (idLesson: number) => {
  let lesson = classMaterial.filter(value => value.id === idLesson)
  return {
    id: lesson[0]?.id,
    qtty: lesson[0]?.qtty,
  }
}

export const getLessonMaterial = (lessonId: number, materialId: number) => {
  let lesson = classMaterial.filter(value => value.id === lessonId)
  return lesson[0]?.material[materialId]
}
