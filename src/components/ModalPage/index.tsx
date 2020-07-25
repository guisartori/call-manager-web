import React, { useRef, useEffect, useState } from 'react'
import './styles.css'
import { Form } from '@unform/web'
import { Input } from '../Input'
import ButtonPrimary from '../ButtonPrimary'
import * as Yup from 'yup'
import api from '../../service'
import { FormHandles } from '@unform/core'
import { useParams } from 'react-router-dom'
import SelectInput from '../SelectInput'

const ModalPage = ({ open, classes, closeModal }: { open: boolean, classes: string, closeModal: () => void }) => {
    const formRef = useRef<FormHandles>(null)
    const { projectId } = useParams()
    const [options, setOptions] = useState<{ value: string; label: string; }[]>([])

    useEffect(() => {
        refreshOptions()
    }, [])

    const refreshOptions = () => {
        api.get(`/functionalities/${projectId}`)
            .then(response => {
                setOptions(response.data)
            })
            .catch(err => console.log(err))
    }

    if (!open)
        return null

    const handleSubmit = async (data: any) => {
        try {
            const schema = Yup.object().shape({
                title: Yup.string().required("Preencha o campo"),
                description: Yup.string().required("Preencha o campo"),
                functionality: Yup.string().required("Selecione uma funcionalidade ou crie uma nova")
            })

            await schema.validate(data, {
                abortEarly: false
            })
            api.post('/call', {
                title: data.title,
                description: data.description,
                functionality: data.functionality,
                projectId: projectId
            })
                .then(response => alert(response.data.msg))
                .then(closeModal)
                .then(refreshOptions)
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
                    <SelectInput
                        options={options}
                        name="functionality"
                        label="Funcionalidade"
                    />
                    <Input name="description" label="Descrição" />
                    <ButtonPrimary type="submit" />
                </div>
            </Form>
        </div >
    )
}

export default ModalPage