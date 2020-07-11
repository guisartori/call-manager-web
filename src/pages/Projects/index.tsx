import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { Grid, Container, Dialog, DialogTitle, TextField, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons'
import ProjectCard from '../../components/ProjectCard'
import './styles.css'
import api from '../../services/api'
import ProjectInterface from '../../intefaces/ProjectInterface';

const Projects = () => {
    const [open, setOpen] = useState(false)
    const [projects, setProjects] = useState<ProjectInterface[]>()
    const [title, setTitle,] = useState('')

    useEffect(() => {
        api.get('/projects')
            .then(response => setProjects(response.data))
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        api.post('/project', {
            title,
            user_id: 2
        })
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(event.target.value)
    }

    return (
        <Grid container spacing={3}>
            <Grid xs={12} item>
                <h1 className="title group">PROJETOS
                    <IconButton className="teste-button" onClick={handleClickOpen} aria-label="save" size="medium">
                        <Add />
                    </IconButton>
                </h1>
                <Container className="container-fluid">
                    <Grid spacing={3} container>
                        {projects?.map(project => {
                            return (
                                <Grid item xs={12} md={5} lg={5} key={project.id}>
                                    <ProjectCard project={project} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="new-project" className="new-project">
                <DialogTitle>
                    PROJETO
                </DialogTitle>
                <form onSubmit={(e) => handleSubmit(e)} action="/project">
                    <Grid className="group">
                        <TextField onChange={(e) => handleChange(e)} id="title" name="title" label="Nome" variant="outlined" className="text-field-custom" />
                        <IconButton type="submit" aria-label="save" size="medium">
                            <Add />
                        </IconButton>
                    </Grid>
                </form>
            </Dialog>
        </Grid>
    )
}

export default Projects