import React from 'react'
import './styles.css'
import ProjectCard from '../../components/ProjectCard'

const Projects = () => {
    return (
        <>
            <h1>Projetos</h1>
            <ProjectCard total_new_calls={2} project_name="WorkManager LITE" percentual={1} project_id={1} />
        </>
    )
}

export default Projects