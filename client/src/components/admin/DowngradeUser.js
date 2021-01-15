import React, {useState} from 'react'
import{Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../FormComponents'
import {dnGradeApi} from '../../services/api/userApi'
import ModalPage from '../ModalPage'

const DowngradeUser = ({setShowDowngrade, submitting, setSubmitting}) => {
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()

    const dnGradeInit={username:'', password:''}
    const dnGradeSchema= Yup.object({
        username: Yup.string().required('username to be up-graded is required'),
        password: Yup.string().required('admin password is required')
    })
    const dnGradeSubmit=async(values, onSubmitProps)=>{
        setSubmitting(true)
        const result = await dnGradeApi(values)
        if(result===200){
            setResponse('successfully down-graded username')
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
        <Formik initialValues={dnGradeInit} validationSchema={dnGradeSchema} onSubmit={dnGradeSubmit}>
            {
                formik=>(
                    <Form>
                        <InputField name={'username'} label={'Username to downgrade:'} type={'text'} placeholder={'username to be downgraded from admin'} />
                        <InputField name={'password'} label={'Admin password:'} type={'password'} placeholder={'your admin password'} />
                        <ButtonComponent type={'submit'} disabled={submitting} label={submitting?'please wait...': 'Donwgrade username'} />
                        <Link onClick={()=>setShowDowngrade(false)} to='#'>Hide form</Link>
                    </Form>
                )
            }
        </Formik>
    </>
    )
}

export default DowngradeUser
