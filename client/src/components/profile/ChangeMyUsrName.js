import {useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import {ButtonComponent, InputField} from '../FormComponents'
import {updateUsernameApi} from '../../services/api/userApi'
import { Link } from 'react-router-dom'
import ModalPage from '../ModalPage'


const ChangeMyUsrName=({submitting, setSubmitting, setHideUsernameForm})=>{
    
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()
    const initialValuesUsername={newUsername:'', password:''}
    const validationSchemaUsername= Yup.object({
        newUsername: Yup.string().required('Required')
                        .min(4)
                        .max(40)
                        .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.]+$/, 'username can only contain letters, numbers and special characters ~!@$^*()_+={}:;.'),
        password: Yup.string().required('Required')
                    .min(4)
                    .max(12)
                    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/, 'password can only contain letters, numbers and special characters !@#$*+=:.')
    })
    const updateUsername=async(values, onSubmitProps)=>{
        setSubmitting(true)
        const result = await updateUsernameApi(values)
        onSubmitProps.resetForm()
        setHideUsernameForm(true)
        if(result===200){
            setResponse('successfully upgdated username')
            setStyleProp('Success')
        } else{
            setResponse(result)
            setStyleProp('Error')
        }
        setOpenModal(true)
        setSubmitting(false)
    }

    return(
        <>
            <ModalPage openModal={openModal} setOpenModal={setOpenModal} message={response} styleProp={styleProp}/>
            <Formik initialValues={initialValuesUsername} validationSchema={validationSchemaUsername} onSubmit={updateUsername}>
                    {
                        formik=>(
                            <Form >
                                <InputField name={'newUsername'} label={'New username: '} type={'text'} placeholder={'enter a new username'} />
                                <InputField name={'password'} label={'Password: '} type={'password'} placeholder={'enter your password'} />
                                <ButtonComponent disabled={submitting} type={'submit'} label={submitting?'please wait...':'update username'} />
                                <Link to='#' onClick={()=>setHideUsernameForm(true)}>Hide form</Link>
                            </Form>
                        )
                    }
            </Formik>
        </>

    )
}
export default ChangeMyUsrName