import ProjectInterface from "./ProjectInterface";

export default interface CallInterface {
    id: number,
    title: string,
    description: string,
    project: ProjectInterface
}