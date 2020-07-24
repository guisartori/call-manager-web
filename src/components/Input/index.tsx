import React, { useRef, useEffect, useState } from 'react'
import './styles.css'
import { useField } from '@unform/core';

export const Input = (props: {
    name: string,
    label: string,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [status, setStatus] = useState('')
    const { fieldName, defaultValue, registerField, error } = useField(props.name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    useEffect(() => {
        if (error) {
            setStatus('error')
        } else {
            setStatus('')
        }
    }, [error])

    return (
        <div className={`input-block  ${status}`}>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                defaultValue={defaultValue}
                ref={inputRef}
                type="text"
                autoComplete="off"
                id={props.name}
                name={props.name} />
            <span>{error}</span>
        </div>
    )
}
