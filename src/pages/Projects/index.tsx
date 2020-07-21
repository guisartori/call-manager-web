import React, { useState, useEffect } from 'react'
import './styles.css'
import ProjectCard from '../../components/ProjectCard'
import ProjectCardInterface from '../../models/ProjectCardInterface'
import api from '../../service'
import ButtonNew from '../../components/ButtonNew'

const Projects = () => {
    const [projects, setProjects] = useState<ProjectCardInterface[]>([])

    const refreshProjects = () => {
        api.get<ProjectCardInterface[]>("/projects")
            .then(response =>
                setProjects(response.data))
            .catch(err => console.log(err))
    }

    useEffect(refreshProjects, [])

    const handleClick = () => {
        const projectName = prompt("Digite o nome do novo projeto")
        if (projectName)
            api.post('/project', {
                title: projectName
            })
                .then(response => alert(response.data.msg))
                .then(refreshProjects)
                .catch(err => console.log(err))
    }

    return (
        <>
            <h1>
                Projetos
                <ButtonNew handleClick={handleClick} />
            </h1>
            <div className="container">
                {
                    projects.map((project, index) => {
                        return <ProjectCard project={project} key={index} />
                    })
                }

            </div>
        </>
    )
}

export default Projects