import React, {useState} from 'react'
import{Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../FormComponents'
import {delUserApi} from '../../services/api/userApi'
import ModalPage from '../ModalPage'

const DeleteUser = ({setShowDelete, submitting, setSubmitting}) => {
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()

    const delInit={username:'', password:''}
    const delSchema= Yup.object({
        username: Yup.string().required('a username to delete is required')
                    .min(4)
                    .max(40)
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.]+$/, 'username can only contain letters, numbers and special characters ~!@$^*()_+={}:;.'),
        password: Yup.string().required('your admin password is required')
                    .min(4)
                    .max(12)
                    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/, 'password can only contain letters, numbers and special characters !@#$*+=:.')
    })

    const delSubmit=async(values, onSubmitProps)=>{
        setSubmitting(true)
        const result = await delUserApi(values)
        if(result===200){
            setResponse('successfully deleted user')
            setStyleProp('Success')
        } else{
            setResponse(result)
            setStyleProp('Error')
        }
        setOpenModal(true)
        onSubmitProps.resetForm()
        setSubmitting(false)
    }
   
    return (  
    <>
        <ModalPage openModal={openModal} setOpenModal={setOpenModal} styleProp={styleProp} message={response} />
        <Formik initialValues={delInit} validationSchema={delSchema} onSubmit={delSubmit}>
            {
                formik=>(
                    <Form>
                        <InputField name={'username'} label={'Username to delete:'} type={'text'} placeholder={'username to be deleted'} />
                        <InputField name={'password'} label={'Admin password:'} type={'password'} placeholder={'your admin password'} />
                        <ButtonComponent type={'submit'} disabled={submitting} label={submitting?'please wait...': 'Delete username'} />
                        <Link onClick={()=>setShowDelete(false)} to='#'>Hide form</Link>
                    </Form>
                )
            }
        </Formik>
</>
    )
}

export default DeleteUser
