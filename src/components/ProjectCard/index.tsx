import React from 'react'
import './styles.css'
import Project from '../../models/Project'
import { useHistory } from 'react-router-dom'

const ProjectCard = (props: {project: Project}) => {
    const history = useHistory()
    const project = props.project

    const handleClick = (id: number) => {
        history.push(`/calls/${project.id}`)
    }

    return (
        <div className="project-card" onClick={() => handleClick(project.id)}>
            <div className="badge">{project.counter_new_calls}</div>
            <h2>{project.title}</h2>
            <div className="percent">90%...</div>
        </div>
    )
}

export default ProjectCard