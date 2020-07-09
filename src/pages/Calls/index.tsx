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

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface CallInterface {
    title: string,
    description: string,
    functionality: string,
    responsable: string,
    status: string
}

const Calls = () => {
    const params = useParams<{ id: string }>()
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        functionality: '',
        responsable_id: 1,
        description: '',
        functionality_id: 1,
        creator_id: 1,
        project_id: 3
    })
    const [calls, setCalls] = useState<CallInterface[]>()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // console.log(params.id)
        api.get<CallInterface[]>('call', {
            params: {
                project_id: params.id
            }
        }).then(response => {
            setCalls(response.data)
            console.log(response.data)
        })
    }, [])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        api.post(
            'call',
            formData,
        ).then(value => console.log(value))
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(formData)
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <Menu />
            <div className="call-container">
                <div className="call-title">
                    <h1>Chamados</h1>
                    <NewButton onClick={handleClickOpen} />
                </div>
                {calls?.map((call, index) => {
                    return (
                        <Call key={index}
                            responsable={String(call.responsable)}
                            functionality={call.functionality}
                            description={call.description}
                            title={call.title}
                            status={call.status}
                        />)
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
                        <TextInputCustom
                            handleChange={handleChange}
                            id="functionality"
                            name="functionality"
                            label="Funcionalidade"
                        />
                        <TextInputCustom
                            handleChange={handleChange}
                            id="responsable_id"
                            name="responsable_id"
                            label="Responsável"
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