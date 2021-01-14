import React, {useState} from 'react'
import{Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../FormComponents'
import {unflagApi} from '../../services/api/userApi'
import ModalPage from '../ModalPage'

const UnflagUser = ({setShowFlagged, submitting, setSubmitting}) => {
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()

    const unflagInit={unflagUser:'', password:''}
    const unflagSchema= Yup.object({
        unflagUser: Yup.string().required('a username to unflag is required'),
        password: Yup.string().required('your admin password is required')
    })
    const unflagSubmit=async(values, onSubmitProps)=>{
        setSubmitting(true)
        const result = await unflagApi(values)
        if(result===200){
            setResponse('successfully unflagged username')
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
</>
    )
}

export default UnflagUser
