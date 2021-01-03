import {Field, ErrorMessage} from 'formik'
export const InputField=({label, name, type, placeholder})=>{
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name} type={type} placeholder={placeholder} />
            <span style={{color:'red'}}><ErrorMessage name={name} /></span>
        </div>
    )
}

export const ButtonComponent=({type, label, disabled, onClick})=>{
    return(
        <button type={type} disabled={disabled} onClick={onClick}>{label}</button>
    )
}