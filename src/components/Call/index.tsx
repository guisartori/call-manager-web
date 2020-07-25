import React, { ChangeEvent, useRef, useState } from 'react'
import './styles.css'
import CallInterface from '../../models/CallInterface'
import CommitInterface from '../../models/CommitInterface'
import api from '../../service'
import Modal from '../Modal'
import { Input } from '../Input'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import ButtonSend from '../ButtonSend'



const Call = (props: { call: CallInterface, refreshCalls: () => void }) => {
    const formRef = useRef<FormHandles>(null)
    const [open, setOpen] = useState(false)
    const [toStatus, setToStatus] = useState("")

    const lastStatus = props.call.commits[0]
        ? props.call.commits[0].toStatus
        : "CREATED"


    const callHistory = (commits: CommitInterface[]) => {
        if (commits.length > 0) {
            return (
                <div className="call-history">
                    <h3>
                        Histórico
                </h3>
                    <ul>
                        {
                            props.call.commits.map((commit, index) => {
                                return (
                                    <li key={index}>
                                        <h4>{`${commit.fromStatus} to ${commit.toStatus}`}</h4>
                                    Guilherme Sartori says: <span>{`"${commit.comment}"`}</span>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            )
        }
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setOpen(true)
        setToStatus(event.target.value)
    }

    const handleSubmit = async (data: any) => {
        try {
            const schema = Yup.object().shape({
                comment: Yup.string().required("Preencha o campo"),
            })

            await schema.validate(data, {
                abortEarly: false
            })

            const finalData = {
                comment: data.comment,
                callId: props.call.call_id,
                fromStatus: lastStatus,
                toStatus: toStatus
            }

            api.post("/commit", finalData)
                .then(response => alert(response.data.msg))
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

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="call">
            <div className="call-title">
                <h2>{`#${props.call.call_id} - ${props.call.call_title}`}</h2>
                <span>{props.call.call_creator_name}</span>
            </div>
            <div className="call-info">
                <svg>
                    <line x1="70%" x2="70%" y1={0} y2={77} />
                    <line x1="70%" x2="95%" y1={27} y2={27} />
                    <line x1="70%" x2="95%" y1={77} y2={77} />
                </svg>
                <div className="status-button">
                    <select name="statusBtn" defaultValue={lastStatus} id="statusBtn" onChange={handleSelectChange}>
                        <option value="NEW">New</option>
                        <option value="DOING">Doing</option>
                        <option value="DONE">Done</option>
                        <option value="PAUSED">Paused</option>
                    </select>
                </div>
                <ul>
                    <li>
                        {props.call.functionality_name}
                    </li>
                    <li>
                        {props.call.call_description}
                    </li>
                </ul>
            </div>

            {callHistory(props.call.commits)}

            <Modal open={open} title={toStatus} close={handleClose}>
                <Form onSubmit={handleSubmit} ref={formRef} className="form-new-project">
                    <Input name="comment" label="Comentário" />
                    <ButtonSend />
                </Form>
            </Modal>
        </div>
    )
}

export default Call