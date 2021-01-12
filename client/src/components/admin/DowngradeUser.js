import React from 'react'
import{Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../FormComponents'
import {dnGradeApi} from '../../services/api/userApi'

const DowngradeUser = ({setShowDowngrade, submitting, setSubmitting}) => {
    const dnGradeInit={dnUser:'', password:''}
    const dnGradeSchema= Yup.object({
        dnUser: Yup.string().required('username to be up-graded is required'),
        password: Yup.string().required('admin password is required')
    })
    const dnGradeSubmit=async(values, onSubmitProps)=>{
        setSubmitting(true)
        await dnGradeApi(values)
        onSubmitProps.resetForm()
        setSubmitting(false)
    }
    return (
        <Formik initialValues={dnGradeInit} validationSchema={dnGradeSchema} onSubmit={dnGradeSubmit}>
            {
                formik=>(
                    <Form>
                        <InputField name={'dnUser'} label={'Username to downgrade:'} type={'text'} placeholder={'username to be downgraded from admin'} />
                        <InputField name={'password'} label={'Admin password:'} type={'password'} placeholder={'your admin password'} />
                        <ButtonComponent type={'submit'} disabled={submitting} label={submitting?'please wait...': 'Donwgrade username'} />
                        <Link onClick={()=>setShowDowngrade(false)} to='#'>Hide form</Link>
                    </Form>
                )
            }
        </Formik>
    )
}

export default DowngradeUser
