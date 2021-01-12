import React from 'react'
import{Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../FormComponents'
import {delUserApi} from '../../services/api'

const DeleteUser = ({setShowDelete, submitting, setSubmitting}) => {
    const delInit={delUser:'', password:''}

    const delSchema= Yup.object({
        delUser: Yup.string().required('a username to delete is required'),
        password: Yup.string().required('your admin password is required')
    })

    const delSubmit=async(values, onSubmitProps)=>{
        setSubmitting(true)
        await delUserApi(values)
        onSubmitProps.resetForm()
        setSubmitting(false)
    }
    return (
        <Formik initialValues={delInit} validationSchema={delSchema} onSubmit={delSubmit}>
            {
                formik=>(
                    <Form>
                        <InputField name={'delUser'} label={'Username to delete:'} type={'text'} placeholder={'username to be deleted'} />
                        <InputField name={'password'} label={'Admin password:'} type={'password'} placeholder={'your admin password'} />
                        <ButtonComponent type={'submit'} disabled={submitting} label={submitting?'please wait...': 'Delete username'} />
                        <Link onClick={()=>setShowDelete(false)} to='#'>Hide form</Link>
                    </Form>
                )
            }
        </Formik>
    )
}

export default DeleteUser
