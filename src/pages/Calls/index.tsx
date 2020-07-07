import React from 'react'
import { useParams } from 'react-router-dom'

const Calls = () => {
    const params = useParams<{id: string}>()


    return (
        <h1>Call {params.id}</h1>
    )
}

export default Calls