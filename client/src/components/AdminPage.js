import React, {useState} from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../components/FormComponents'
import{delUserApi, unflagApi} from '../services/api'


//upgrade username to admin priviledge
//check scores by username

const AdminPage = () => {
    const unflagInitialValues={unflagUser:'', password:''}
    const delInitialValues={delUser:'', password:''}
    const unflagValidationSchema= Yup.object({
        unflagUser: Yup.string().required('a username to unflag is required'),
        password: Yup.string().required('your admin password is required')
    })
    const delValidationSchema= Yup.object({
        delUser: Yup.string().required('a username to delete is required'),
        password: Yup.string().required('your admin password is required')
    })
    const unflagSubmit=async(values, onSubmitProps)=>{
        await unflagApi(values)
        onSubmitProps.resetForm()
    }
    const delUserSubmit=async(values, onSubmitProps)=>{
        await delUserApi(values)
        onSubmitProps.resetForm()
    }
    return (
        <div className='Form'>
            <Formik initialValues={unflagInitialValues} validationSchema={unflagValidationSchema} onSubmit={unflagSubmit}>
                {
                    formik=>(
                        <Form>
                            <InputField name={'unflagUser'} label={'Username to unflag:'} type={'text'} placeholder={'username to be unflagged'} />
                            <InputField name={'password'} label={'Admin password:'} type={'password'} placeholder={'your admin password'} />
                            <ButtonComponent type={'submit'} label={'Unflag username'} />
                        </Form>
                    )
                }
            </Formik>
            <Formik initialValues={delInitialValues} validationSchema={delValidationSchema} onSubmit={delUserSubmit}>
                {
                    formik=>(
                        <Form>
                            <InputField name={'delUser'} label={'Username to delete'} type={'text'} placeholder={'username to be deleted'} />
                            <InputField name={'password'} label={'Admin password:'} type={'password'} placeholder={'your admin password'} />
                            <ButtonComponent type={'submit'} label={'Delete username'} />
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default AdminPage
