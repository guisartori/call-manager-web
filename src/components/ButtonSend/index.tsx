import React from 'react'
import './styles.css'
import { FaSave } from 'react-icons/fa'

const ButtonSend = () => {
    return (
        <button type="submit" className="btn-send">
            <FaSave />
        </button>
    )
}

export default ButtonSend