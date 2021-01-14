import React, {useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import {ButtonComponent, InputField} from './FormComponents'
import {fetchMyScoresApi } from '../services/api/quizApi'
import {updateUsernameApi, updatePasswordApi} from '../services/api/userApi'
import '../css/profile.css'
import { Link } from 'react-router-dom'
import ScoreTable from './ScoreTable'
import ModalPage from './ModalPage'

const Profile = () => {
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()
    const[submitting, setSubmitting] = useState(false)
    const [scores, setScores] = useState([])
    const [hideUsernameForm, setHideUsernameForm] = useState(true)
    const [hidePasswordForm, setHidePasswordForm] = useState(true)

    const initialValuesUsername={newUsername:'', password:''}
    const initialValuesPass={password:'', newPassword:'', confirm:''}
    const validationSchemaUsername= Yup.object({
        newUsername: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    })
    const validationSchemaPass= Yup.object({
        password: Yup.string().required('Required'),
        newPassword: Yup.string().required('Required'),
        confirm: Yup.string().required('Required').oneOf([Yup.ref('newPassword'),''], "passwords don't match")
    })
    
    const fetchScores= async()=>{
        setSubmitting(true)
        const result = await fetchMyScoresApi()
        if(Array.isArray(result)){
            setScores(result)
        }else{
            setResponse(result)
            setStyleProp('Error')
            setOpenModal(true)
        }
        setSubmitting(false)
    }
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
        <div className='Profile'>
            {
                scores.length>0 &&  <>
                    <ScoreTable array={scores} />
                    <Link to='#' onClick={()=>setScores([])}>Hide my scores</Link>
                </>
            }
            
            <ButtonComponent disabled={submitting} onClick={fetchScores} label={submitting?'please wait...':'Get my scores'} />

            {
                hideUsernameForm?  
                <ButtonComponent onClick={()=>setHideUsernameForm(false)} label={submitting?'please wait...':"Change my username"} disabled={submitting}/>
                :
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
            }
            {
                hidePasswordForm?
                <ButtonComponent onClick={()=>setHidePasswordForm(false)} label={submitting?'please wait...':'Change my password'} disabled={submitting}/>
                :
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
             }
        </div>
    </>
    )
}

export default Profile

