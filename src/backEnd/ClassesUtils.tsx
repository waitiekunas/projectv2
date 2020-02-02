import { classes } from "../mockData/classDescriptions/classes"

export const getClassesFieldFromBack = (field: string): Array<string> => {
    let allValues = Array.from(classes, (value) => {
        return value[field]
    })
    return Array.from(new Set(allValues))
}
//TODO: interface for Object
export const getClassesByTopicFromBack = (topic: string): Array<any> => {
    return classes.filter((value) => value.topic === topic)
}