import React, { useState, useEffect } from 'react'
import './styles.css'
import Call from '../../components/Call'
import ButtonNew from '../../components/ButtonNew'
import CallInterface from '../../models/CallInterface'
import api from '../../service'
import { useParams } from 'react-router-dom'

const Calls = () => {
    const [calls, setCalls] = useState<CallInterface[]>([])
    const { projectId } = useParams()
    const handleClick = () => {
        console.log('clickou em mim')
    }

    const refreshCalls = () => {
        api.get<CallInterface[]>(`/calls/${projectId}`)
            .then(response => setCalls(response.data))
            .catch(err => console.log(err))
    }

    useEffect(refreshCalls, [])

    return (
        <>
            <h1>Chamados
             <ButtonNew handleClick={handleClick} />
            </h1>
            {
                calls.map((call, index) => {
                    return (
                        <Call call={call} key={index} />
                    )
                })
            }
        </>
    )
}

export default Calls