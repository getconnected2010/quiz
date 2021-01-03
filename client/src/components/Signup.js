import React from 'react'
import {Form, Formik, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {InputField, ButtonComponent} from './FormComponents'

const Signup = () => {
    const initialValues={username:'', password:'', confirm:'', dob:''}
    const validationSchema= Yup.object({
        username: Yup.string()
                    .required('username required'),
        password: Yup.string().required('password field required'),
        confirm: Yup.string().required('password confirmation fielf required')
                    .oneOf([Yup.ref('password')], "password fields don't match"),
        dob: Yup.string().required('a four digit number required').length(4)
                .matches(/^[0-9]+$/, "enter your birthday in two digit month and two digit day format")
    })
    const handleSubmit= async(values, onSubmitProps)=>{
        
        console.log('after dispatch in signup.js')
        
    }
    return (
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

                            <ButtonComponent label={'Sign up'} type={'submit'} label={formik.isSubmitting?<>Submitting</>:<>Submit</>}/>
                    
                        </Form>
                    </div>
                )
            }
           
        </Formik>
    )
}
export default Signup



