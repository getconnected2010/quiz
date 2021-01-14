import React,{useState} from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {InputField, ButtonComponent} from './FormComponents'
import {resetPasswordApi} from '../services/api/userApi'
import ModalPage from './ModalPage'


const ResetPassword = () => {
    const [response, setResponse]= useState()
    const [styleProp, setStyleProp] = useState()
    const [openModal, setOpenModal] = useState(false)
    const initialValues={username:'', password:'', confirm:'', dob:''}
    const validationSchema= Yup.object({
        username: Yup.string().required('please enter username'),
        password: Yup.string().required('please enter a password'),
        confirm: Yup.string().required('please confirm your password')
                    .oneOf([Yup.ref('password'),''],"passwords dont't match"),
        dob: Yup.string().required('enter your birthday in two digit month and two digit date format')
                .length(4)
                .matches(/^[0-9]+$/, 'enter your birthday in two digit month and two digit date format')
    })
    const onSubmit=async(values, onSubmitProps)=>{
        const result = await resetPasswordApi(values) 
        if(result===200){
            setResponse('Sign up Success. Continue to Login page')
            setStyleProp('Success')
        }else{
            setResponse(result)
            setStyleProp('Error')
        }
        setOpenModal(true)
        onSubmitProps.resetForm()
    }
    return (
    <>
        <ModalPage styleProp={styleProp} openModal={openModal} message={response} setOpenModal={setOpenModal}/>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik=>(
                    <div className="Form">
                        <h1>Reset your password</h1>
                        <Form>
                            <InputField label={'User name: '} type={'text'} name={'username'} placeholder={'username'} />
                            <InputField label={'New password: '} type={'password'} name={'password'} placeholder={'password'} />
                            <InputField label={'Confirm password: '} type={'password'} name={'confirm'} placeholder={'confirm password'} />
                            <InputField label={'Date of Birth (MMDD): '} type={'text'} name={'dob'} placeholder={'this should match what you entered originally when you signed up'} />
                            <ButtonComponent type={'submit'} disabled={formik.isSubmitting} label={formik.isSubmitting?<>Submitting</>:<>Submit</>}/>
                        </Form>
                    </div>
                )
            }
        </Formik>
    </>
    )
}

export default ResetPassword
