import React from 'react'
import './styles.css'
import { useHistory } from 'react-router-dom'
import ProjectCardInterface from '../../models/ProjectCardInterface'



const ProjectCard = (props: { project: ProjectCardInterface }) => {
    const history = useHistory()
    const handleClickOpenCalls = () => {
        history.push(`/calls/${props.project.project_id}`)
    }

    return (
        <div className="project-card" onClick={handleClickOpenCalls}>
            <div className="badge-new">
                {props.project.total_new_calls}
            </div>
            <h2>
                {props.project.project_name}
            </h2>
            <div className="progress-bar" style={{ width: `${props.project.percentual}%` }}>
                {Math.floor(props.project.percentual)}%...
            </div>
        </div>
    )
}

export default ProjectCard