import React from 'react'
import{Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../FormComponents'
import {unflagApi} from '../../services/api/userApi'

const UnflagUser = ({setShowFlagged, submitting, setSubmitting}) => {
    const unflagInit={unflagUser:'', password:''}
    const unflagSchema= Yup.object({
        unflagUser: Yup.string().required('a username to unflag is required'),
        password: Yup.string().required('your admin password is required')
    })
    const unflagSubmit=async(values, onSubmitProps)=>{
        setSubmitting(true)
        await unflagApi(values)
        onSubmitProps.resetForm()
        setSubmitting(false)
    }
    return (
        <Formik initialValues={unflagInit} validationSchema={unflagSchema} onSubmit={unflagSubmit}>
        {
            formik=>(
                <Form>
                    <InputField name={'unflagUser'} label={'Username to unflag:'} type={'text'} placeholder={'username to be unflagged'} />
                    <InputField name={'password'} label={'Admin password:'} type={'password'} placeholder={'your admin password'} />
                    <ButtonComponent type={'submit'} disabled={submitting} label={submitting?'please wait...': 'Unflag username'} />
                    <Link onClick={()=>setShowFlagged(false)} to='#'>Hide form</Link>
                </Form>
            )
        }
        </Formik>
    )
}

export default UnflagUser
