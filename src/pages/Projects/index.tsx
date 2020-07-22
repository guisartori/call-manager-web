import React, { useState, useEffect, FormEvent } from 'react'
import './styles.css'
import ProjectCard from '../../components/ProjectCard'
import ProjectCardInterface from '../../models/ProjectCardInterface'
import api from '../../service'
import ButtonNew from '../../components/ButtonNew'
import Modal from '../../components/Modal'
import { Form } from '@unform/web';
import { Input } from '../../components/Input'

const Projects = () => {
    const [projects, setProjects] = useState<ProjectCardInterface[]>([])
    const [open, setOpen] = useState(false)

    const refreshProjects = () => {
        api.get<ProjectCardInterface[]>("/projects")
            .then(response =>
                setProjects(response.data))
            .catch(err => console.log(err))
    }

    useEffect(refreshProjects, [])

    const handleClick = () => {
        // const projectName = prompt("Digite o nome do novo projeto")
        showModal()
        // if (projectName)
        //     api.post('/project', {
        //         title: projectName
        //     })
        //         .then(response => alert(response.data.msg))
        //         .then(refreshProjects)
        //         .catch(err => console.log(err))
    }

    const showModal = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (data: any) => {
        //TODO VALIDAR COM YUP
        api.post('/project', {
            title: data.title
        })
            .then(response => alert(response.data.msg))
            .then(refreshProjects)
            .then(handleClose)
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
            <Modal open={open} close={handleClose} title="PROJETO">
                <Form onSubmit={handleSubmit}>
                    <Input name="title" label="Nome" />
                </Form>
            </Modal>
        </>
    )
}

export default Projects