import {useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import {ButtonComponent, InputField} from '../FormComponents'
import {updatePasswordApi} from '../../services/api/userApi'
import { Link } from 'react-router-dom'
import ModalPage from '../ModalPage'


const ChangeMyPswrd = ({submitting, setSubmitting, setHidePasswordForm}) => {
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()
    const initialValuesPass={password:'', newPassword:'', confirm:''}
    const validationSchemaPass= Yup.object({
        password: Yup.string().required('Required')
                    .min(4)
                    .max(12)
                    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/, 'password can only contain letters, numbers and special characters !@#$*+=:.'),
        
        newPassword: Yup.string().required('Required')
                    .min(6)
                    .max(12)
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$*+=:.])/, 'password must contain lower case letter, upper case letter, number and special character from !@#$*+=:.')
                    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/, 'password can only contain letters, numbers and special characters from !@#$*+=:.'),
        
        confirm: Yup.string().required('Required').oneOf([Yup.ref('newPassword'),''], "passwords don't match")
    })
    const updatePassword=async(values, onSubmitProps)=>{
        setSubmitting(true)
        const result = await updatePasswordApi(values)
        setHidePasswordForm(true)
        if(result===200){
            setResponse('successfully upgdated password')
            setStyleProp('Success')
        } else{
            setResponse(result)
            setStyleProp('Error')
        }
        onSubmitProps.resetForm()
        setOpenModal(true)
        setSubmitting(false)
    }
    return (
        <>
            <ModalPage openModal={openModal} setOpenModal={setOpenModal} message={response} styleProp={styleProp}/>
            <Formik initialValues={initialValuesPass} validationSchema={validationSchemaPass} onSubmit={updatePassword}>
                    {
                        formik=>(
                            <Form >
                                <InputField name={'password'} label={'Current Password:'} type={'password'} placeholder={'enter current password'} />
                                <InputField name={'newPassword'} label={'New Password: '} type={'password'} placeholder={'enter new password'} />
                                <InputField name={'confirm'} label={'Confirm new password:'} type={'password'} placeholder={'confirm new password'} />
                                <ButtonComponent disabled={submitting} type={'submit'} label={submitting?'please wait...':'update password'} />
                                <Link to='#' onClick={()=>setHidePasswordForm(true)}>Hide form</Link>
                            </Form>
                        )
                    }
            </Formik>
        </>
    )
}

export default ChangeMyPswrd
