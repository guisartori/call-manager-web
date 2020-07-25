import React, { useRef, useEffect, useState } from 'react'
import './styles.css'
import CreatableSelect from 'react-select/creatable';
import { useField } from '@unform/core';

const SelectInput = (props:
    {
        options: { value: string, label: string }[],
        name: string,
        label: string
    }) => {
    const { fieldName, defaultValue, registerField, error } = useField(props.name);
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedValue, setSelectedValue] = useState<string | number | undefined>()

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });

    }, [fieldName, registerField]);

    const handleChange = (data: any) => {
        // console.log(data)
        if (data) {
            setSelectedValue(data.value + (data.__isNew__ ? "__isNew__" : ""))
        } else {
            setSelectedValue(undefined)
        }
    }

    return (
        <div className="input-block select">

            <label htmlFor={props.name}>{props.label}</label>
            <CreatableSelect
                className="input-select"
                classNamePrefix="custom"
                isClearable
                onChange={handleChange}
                options={props.options}
                id={props.name}
                placeholder="Selecione..."


            />
            <input type="hidden" name={props.name} value={selectedValue} ref={inputRef} />
        </div>
    )
}

export default SelectInput