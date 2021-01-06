import React from 'react'
import {Field, ErrorMessage} from 'formik'

export const ButtonComponent=({type, id, label, disabled, onClick})=>{
    return(
        <button type={type} id={id} disabled={disabled} onClick={onClick}>{label}</button>
    )
}

export const InputField=({label, name, type, placeholder})=>{
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name} type={type} placeholder={placeholder} />
            <span style={{color:'red'}}><ErrorMessage name={name} /></span>
        </div>
    )
}

export const SelectField=({label, name, selectOptions})=>{
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name} as='select'>
                {
                    selectOptions.map(option=>(
                        <option value={option} key={option} >{option}</option>
                    ))
                }
            </Field>
            <span style={{color:'red'}}><ErrorMessage name={name} /></span>
        </div>
    )
}