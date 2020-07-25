import React, { useState, useEffect } from 'react'
import './styles.css'
import Call from '../../components/Call'
import ButtonNew from '../../components/ButtonNew'
import CallInterface from '../../models/CallInterface'
import api from '../../service'
import { useParams } from 'react-router-dom'
import ModalPage from '../../components/ModalPage'

const Calls = () => {
    const [calls, setCalls] = useState<CallInterface[]>([])
    const { projectId } = useParams()
    const [modalPageOpen, setModalPageOpen] = useState(false)
    const [classes, setClasses] = useState<string>("")

    const handleClick = () => {
        openModal()
    }

    const refreshCalls = () => {
        api.get<CallInterface[]>(`/calls/${projectId}`)
            .then(response => setCalls(response.data))
            .catch(err => console.log(err))
    }

    useEffect(refreshCalls, [calls])

    const openModal = () => {
        setClasses("")
        setModalPageOpen(true)
    }

    const closeModal = (refresh: boolean = true) => {
        setClasses("close-modal")
        setTimeout(() => setModalPageOpen(false), 300)
        if (refresh)
            refreshCalls()
    }

    document.addEventListener("keydown", event => {
        // console.log('ue esc')
        if (event.keyCode === 27 && setModalPageOpen)
            closeModal(false)
    })

    return (
        <>
            <h1>Chamados
             <ButtonNew handleClick={handleClick} />
            </h1>
            <div className="container">

                {
                    calls.map((call, index) => {
                        return (
                            <Call call={call} key={index} refreshCalls={refreshCalls} />
                        )
                    })
                }
            </div>
            <ModalPage classes={String(classes)} open={modalPageOpen} closeModal={closeModal} />
        </>
    )
}

export default Calls