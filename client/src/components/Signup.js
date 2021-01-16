import React, {useState} from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {InputField, ButtonComponent} from './FormComponents'
import {signUpApi} from '../services/api/userApi'
import ModalPage from './ModalPage'

const Signup = () => {
    const [response, setResponse] = useState()
    const [styleProp, setStyleProp] = useState()
    const [openModal, setOpenModal] = useState(false)
    const initialValues={username:'', password:'', confirm:'', dob:''}
    const validationSchema= Yup.object({
        username: Yup.string().required('username required')
                    .min(4)
                    .max(40)
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.]+$/, 'username can only contain letters, numbers and special characters ~!@$^*()_+={}:;.'),
        password: Yup.string().required('password field required')
                    .min(4)
                    .max(12)
                    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/, 'password can only contain letters, numbers and special characters !@#$*+=:.'),
        confirm: Yup.string().required('password confirmation fielf required')
                    .oneOf([Yup.ref('password')], "password fields don't match"),
        dob: Yup.string().required('a four digit number required').length(4)
                .matches(/^[0-9]+$/, "enter your birthday in two digit month and two digit day format")
    })
    const handleSubmit= async(values, onSubmitProps)=>{
        const result = await signUpApi(values)
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
            <ModalPage styleProp={styleProp} openModal={openModal} setOpenModal={setOpenModal} message={response} />
            <Formik initialValues={initialValues} validationSchema={validationSchema}
            onSubmit={handleSubmit}>
                {
                    formik=>(
                        <div className="Form">
                            <h1>Sign Up</h1>
                            <Form>
                                <InputField label={'User name: '} name={'username'} type={'text'} placeholder={'username'} />

                                <InputField label={'Password: '} name={'password'} type={'password'} placeholder={'password'} />
                                
                                <InputField label={'Confirm password: '} name={'confirm'} type={'password'} placeholder={'confirm password'} />
                                
                                <InputField label={'Your birthday (MMDD): '} name={'dob'} type={'text'} placeholder={"we'll use this to retrieve forgotten passwords"} />

                                <ButtonComponent type={'submit'} label={formik.isSubmitting?<>Submitting</>:<>Sign up</>}/>
                        
                            </Form>
                        </div>
                    )
                }  
            </Formik>
        </>
    )
}
export default Signup



