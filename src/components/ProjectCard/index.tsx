import React from 'react'
import './styles.css'
import { useHistory } from 'react-router-dom'

interface ProjectCardInterface {
    project_id: number
    total_new_calls: number,
    project_name: string,
    percentual: number
}

const ProjectCard = (props: ProjectCardInterface) => {
    const history = useHistory()
    const handleClickOpenCalls = () => {
        history.push(`/calls/${props.project_id}`)
    }

    return (
        <div className="project-card" onClick={handleClickOpenCalls}>
            <div className="badge-new">
                {props.total_new_calls}
            </div>
            <h2>
                {props.project_name}
            </h2>
            <div className="progress-bar" style={{ width: `${props.percentual}%` }}>
                {props.percentual}%...
            </div>
        </div>
    )
}

export default ProjectCard