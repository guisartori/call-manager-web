import React, { useRef } from 'react'
import './styles.css'
import { Form } from '@unform/web'
import { Input } from '../Input'
import ButtonPrimary from '../ButtonPrimary'
import * as Yup from 'yup'
import api from '../../service'
import { FormHandles } from '@unform/core'
import { useParams } from 'react-router-dom'

const ModalPage = ({ open, classes, closeModal }: { open: boolean, classes: string, closeModal: () => void }) => {
    const formRef = useRef<FormHandles>(null)
    const { projectId } = useParams()

    if (!open)
        return null


    const handleSubmit = async (data: any) => {
        try {
            const schema = Yup.object().shape({
                title: Yup.string().required("Preencha o campo"),
                description: Yup.string().required("Preencha o campo")
            })

            await schema.validate(data, {
                abortEarly: false
            })
            api.post('/call', {
                title: data.title,
                description: data.description,
                projectId: projectId
            })
                .then(response => alert(response.data.msg))
                .then(closeModal)
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
        <div className={`modal-page ${classes}`}>
            <h1>
                novo chamado
            </h1>
            <Form onSubmit={handleSubmit} ref={formRef}>
                <div className="container form-group">
                    <Input name="title" label="Titulo" />
                    <Input name="description" label="Descrição" />
                    <ButtonPrimary type="submit" />
                </div>
            </Form>
        </div >
    )
}

export default ModalPage