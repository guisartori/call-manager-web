import React from 'react'
import './styles.css'

const ButtonPrimary = (
    { type }: { type: "button" | "submit" | "reset" }
) => {
    return (
        <button type={type} className="btn-primary">
            Enviar
        </button>
    )
}

export default ButtonPrimary