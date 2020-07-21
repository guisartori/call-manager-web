import React from 'react'
import './styles.css'
import ProjectInterface from '../../intefaces/ProjectInterface'
import { useHistory } from 'react-router-dom'

const ProjectCard = (props: { project: ProjectInterface }) => {
    const history = useHistory()
    const project = props.project

    const handleClick = (id: number) => {
        history.push(`/calls/${project.id}`)
    }



    return (
        <div className="project-card" onClick={() => handleClick(project.id)}>
            <div className="badge">{project.counter_new_calls}</div>
            <h2>{project.title}</h2>
            <div className="percent" style={{ width: project.percentual }}>{project.percentual}%...</div>
        </div>
    )
}

export default ProjectCard