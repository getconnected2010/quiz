import React from 'react'
import {Form, Formik, Field, ErrorMessage, FormikProvider} from 'formik'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import {signupAction} from '../actions/userActions'

const Signup = () => {
    const dispatch = useDispatch()
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
    const onSubmit=(values, onSubmitProps)=>{
        dispatch(signupAction(values))
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={onSubmit}>
            {
                formik=>(
                    <div className="Form">
                        <h1>Sign Up</h1>
                        <Form>
                            <label htmlFor='username'>User name: </label>
                            <Field type='text' name='username' placeholder='enter username'/>
                            <span style={{color:'red'}}><ErrorMessage name='username' /></span>

                            <label htmlFor='password'>Password: </label>
                            <Field type='text' name='password' placeholder='enter password' />
                            <span style={{color:'red'}}><ErrorMessage name='password' /></span>

                            <label htmlFor='confirm'>Confirm password: </label>
                            <Field type='text' name='confirm' placeholder='confirm password' />
                            <span style={{color:'red'}}><ErrorMessage name='confirm' /></span>

                            <label htmlFor='dob'>Your birthday (MMDD): </label>
                            <Field type='text' name='dob' placeholder="we'll use this to retrieve forgotten passwords"/>
                            <span style={{color:'red'}}><ErrorMessage name='dob' /></span>

                            <button type='submit'>{formik.isSubmitting?<>Submitting</>: <>Submit</>}</button>
                        </Form>
                    </div>
                )
            }
           
        </Formik>
    )
}
export default Signup



