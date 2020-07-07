import React from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../../components/Menu'
import Call from '../../components/Call'
import './styles.css'

const Calls = () => {
    const params = useParams<{ id: string }>()

    return (
        <>
            <Menu />
            <div className="call-container">
                <h1>Chamados</h1>
                <Call />
            </div>
        </>
    )
}

export default Calls