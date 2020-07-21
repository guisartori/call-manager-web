import React from 'react'
import './styles.css'

const ButtonNew = (props: { handleClick: () => void }) => {
    return (
        <button type="button" className="btn-new" onClick={props.handleClick}>Novo <span>+</span> </button>
    )
}

export default ButtonNew