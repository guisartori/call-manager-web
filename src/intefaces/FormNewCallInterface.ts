export default interface FormNewCallInterface {
    title?: string,
    description?: string,
    functionality?: {
        value: string | number,
        __isNew__: boolean,
    }
    projectId: number
}