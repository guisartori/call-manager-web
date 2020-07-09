import React from 'react'
import './styles.css'


const PrimaryButton = ({ text }: { text: string }) => {
    return (
        <div className="button-container">
            <button type="submit" className="button-primary-custom">{text}</button>
        </div>
    )
}

export default PrimaryButton