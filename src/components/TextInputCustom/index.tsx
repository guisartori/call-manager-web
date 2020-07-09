import React, { ChangeEvent } from 'react'
import { TextField } from '@material-ui/core'
import './styles.css'

interface TextFieldCustom {
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    id: string,
    name: string,
    label: string
}
const TextInputCustom = ({ handleChange, id, name, label }: TextFieldCustom) => {
    return (
        <TextField onChange={(e) => handleChange(e)} id={id} name={name} label={label} variant="outlined" className="text-field-custom" />
    )
}

export default TextInputCustom