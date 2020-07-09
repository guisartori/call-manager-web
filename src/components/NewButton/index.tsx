import React from 'react'
import './styles.css'

interface NewButtonProps {
    onClick: () => void
}
const NewButton = ({ onClick }: NewButtonProps) => {
    return (
        <button className="button-new" type="button" onClick={onClick}>NOVO <span>+</span></button>
    )
}

export default NewButton