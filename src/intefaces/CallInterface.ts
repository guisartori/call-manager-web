import ProjectInterface from "./ProjectInterface";
import FunctionalityInterface from "./FunctionalityInterface";

export default interface CallInterface {
    id: number,
    title: string,
    description: string,
    project: ProjectInterface,
    functionality: FunctionalityInterface
}