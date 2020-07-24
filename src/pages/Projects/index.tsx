import React, { useState, useEffect, useRef } from 'react'
import './styles.css'
import ProjectCard from '../../components/ProjectCard'
import ProjectCardInterface from '../../models/ProjectCardInterface'
import api from '../../service'
import ButtonNew from '../../components/ButtonNew'
import Modal from '../../components/Modal'
import { Form } from '@unform/web';
import { Input } from '../../components/Input'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import ButtonSend from '../../components/ButtonSend'

const Projects = () => {
    const [projects, setProjects] = useState<ProjectCardInterface[]>([])
    const [open, setOpen] = useState(false)
    const formRef = useRef<FormHandles>(null)

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

    const handleSubmit = async (data: any) => {
        //TODO VALIDAR COM YUP
        try {
            const schema = Yup.object().shape({
                title: Yup.string().required("Preencha o campo")
            })
            await schema.validate(data, {
                abortEarly: false
            })

            api.post('/project', {
                title: data.title
            })
                .then(response => alert(response.data.msg))
                .then(refreshProjects)
                .then(handleClose)
                .catch(err => console.log(err))
        } catch (errors) {
            const validationErrors: { [index: string]: any } = {}

            if (errors instanceof Yup.ValidationError) {
                errors.inner.forEach(error => {
                    validationErrors[String(error.path)] = String(error.message);
                })

                formRef.current?.setErrors(validationErrors);
            }

        }

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
                <Form onSubmit={handleSubmit} ref={formRef} className="form-new-project">
                    <Input name="title" label="Nome" />
                    <ButtonSend />
                </Form>
            </Modal>
        </>
    )
}

export default Projects