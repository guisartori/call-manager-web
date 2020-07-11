import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../../components/Menu'
import Call from '../../components/Call'
import './styles.css'
import { Dialog, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions';
import TextInputCustom from '../../components/TextInputCustom'
import PrimaryButton from '../../components/PrimaryButton'
import api from '../../services/api'
import NewButton from '../../components/NewButton'
import CallInterface from '../../intefaces/CallInterface'
import CreatableSelect from 'react-select/creatable';
import FunctionalityInterfaceForm from '../../intefaces/FunctionalityInterfaceForm'
import FormNewCallInterface from '../../intefaces/FormNewCallInterface'


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const Calls = () => {
    const params = useParams<{ projectId: string }>()
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormNewCallInterface>({
        projectId: Number(params.projectId)
    })
    const [calls, setCalls] = useState<CallInterface[]>()
    const [functionalities, setFunctionalities] = useState<FunctionalityInterfaceForm[]>()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        api.get<CallInterface[]>(`calls/${params.projectId}`)
            .then(response => {
                setCalls(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        api.get<FunctionalityInterfaceForm[]>(`functionalities/${params.projectId}`)
            .then(response => {
                setFunctionalities(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        api.post(
            'call',
            formData,
        ).then(value => console.log(value))
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSelectChange = (newValue, { action }) => {
        console.log('teste')
        if (newValue) {
            setFormData({
                ...formData,
                functionality: {
                    value: newValue.value,
                    __isNew__: newValue.__isNew__ ? true : false
                }
            })
        } else {
            setFormData({
                ...formData,
                functionality: undefined
            })
        }
    }

    return (
        <>
            <Menu />
            <div className="call-container">
                <div className="call-container-title">
                    <h1>Chamados</h1>
                    <NewButton onClick={handleClickOpen} />
                </div>
                {calls?.map((call, index) => {
                    return (
                        <Call key={index} call={call} />)
                })}
            </div>
            <Dialog className="new-call" fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <div className="form">
                    <h1>NOVO CHAMADO</h1>
                    <form onSubmit={(e) => handleSubmit(e)} action="/call">
                        <TextInputCustom
                            handleChange={handleChange}
                            id="title"
                            name="title"
                            label="Título"
                        />

                        <CreatableSelect
                            isClearable
                            onChange={handleSelectChange}
                            options={functionalities}
                        />

                        <TextInputCustom
                            handleChange={handleChange}
                            id="description"
                            name="description"
                            label="Descrição"
                        />
                        <PrimaryButton text="Enviar" />
                    </form>
                </div>
            </Dialog>
        </>
    )
}

export default Calls