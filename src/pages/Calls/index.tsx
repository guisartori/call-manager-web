import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../../components/Menu'
import Call from '../../components/Call'
import './styles.css'
import { Dialog, Slide, DialogTitle, TextField, IconButton, Grid } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions';
import TextInputCustom from '../../components/TextInputCustom'
import PrimaryButton from '../../components/PrimaryButton'
import api from '../../services/api'
import NewButton from '../../components/NewButton'
import CallInterface from '../../intefaces/CallInterface'
import CreatableSelect from 'react-select/creatable';
import FunctionalityInterfaceForm from '../../intefaces/FunctionalityInterfaceForm'
import FormNewCallInterface from '../../intefaces/FormNewCallInterface'
import { Add } from '@material-ui/icons'


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const Calls = () => {
    const params = useParams<{ projectId: string }>()
    const [openNewCallDialog, setOpenNewCallDialog] = useState(false);
    const [openNewCommitDialog, setOpenNewCommitDialog] = useState(false);
    const [formData, setFormData] = useState<FormNewCallInterface>({
        projectId: Number(params.projectId)
    })
    const [calls, setCalls] = useState<CallInterface[]>()
    const [functionalities, setFunctionalities] = useState<FunctionalityInterfaceForm[]>()

    const [formCommitData, setFormCommitData] = useState({
        status: '',
        comment: '',
        callId: 0
    })

    const [status, setStatus] = useState('');

    const handleClickOpenNewCallDialog = () => {
        setOpenNewCallDialog(true);
    };

    const handleCloseNewCallDialog = () => {
        setOpenNewCallDialog(false);
    };


    const handleCloseNewCommitDialog = () => {
        setOpenNewCommitDialog(false);
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

    const handleSubmitNewCallDialog = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        api.post(
            'call',
            formData,
        ).then(value => console.log(value))
    }

    // const formatFormCommitData = () => {
    //     setFormCommitData({
    //         status,
    //         comment,
    //         callId
    //     })
    // }

    const handleSubmitNewCommitDialog = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // formatFormCommitData()
        api.post(
            'commit',
            formCommitData,
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

    const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
        setOpenNewCommitDialog(true)
        setStatus(event.target.value)
    }

    return (
        <>
            <Menu />
            <div className="call-container">
                <div className="call-container-title">
                    <h1>Chamados</h1>
                    <NewButton onClick={handleClickOpenNewCallDialog} />
                </div>
                {calls?.map((call, index) => {
                    return (
                        <Call key={index} call={call} handleChangeStatus={handleChangeStatus} />)
                })}
            </div>
            <Dialog open={openNewCommitDialog} onClose={handleCloseNewCommitDialog} aria-labelledby="new-commit" className="new-commit">
                <DialogTitle>
                    COMENTÁRIO
                </DialogTitle>
                <form onSubmit={(e) => handleSubmitNewCommitDialog(e)} action="/commit">
                    <Grid className="group">
                        <TextField onChange={(e) => handleChange(e)} id="title" name="title" label="Nome" variant="outlined" className="text-field-custom" />
                        <IconButton type="submit" aria-label="save" size="medium">
                            <Add />
                        </IconButton>
                    </Grid>
                </form>
            </Dialog>
            <Dialog className="new-call" fullScreen open={openNewCallDialog} onClose={handleCloseNewCallDialog} TransitionComponent={Transition}>
                <div className="form">
                    <h1>NOVO CHAMADO</h1>
                    <form onSubmit={(e) => handleSubmitNewCallDialog(e)} action="/call">
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