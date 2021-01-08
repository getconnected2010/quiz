import React, {useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import {ButtonComponent, InputField} from './FormComponents'
import {fetchScoresApi, updateUsernameApi} from '../services/api'
import './profile.css'

const Profile = () => {
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
    const[submitting, setSubmitting] = useState(false)
    const [scores, setScores] = useState([])
    const [usernameStyle, setUsernameStyle] = useState({display:'none'})
    const [passwordStyle, setPasswordStyle] = useState({display:'none'})
    const fetchScores= async()=>{
        setSubmitting(true)
        const result = await fetchScoresApi()
        setScores( result)
        setSubmitting(false)
    }
    const updateUsername=async(values, onSubmitProps)=>{
        setSubmitting(true)
        await updateUsernameApi(values)
        onSubmitProps.resetForm()
        setUsernameStyle({display:'none'})
        setSubmitting(false)
    }
    const updatePassword=async(values, onSubmitProps)=>{
        setSubmitting(true)
        console.log(values)
        onSubmitProps.resetForm()
        setPasswordStyle({display:'none'})
        setSubmitting(false)
    }
    return (
        <div className='Profile'>
            <table>
                <tbody >
                {
                    scores.map(score=>(
                            <tr key={score.subject}>
                                <td>{score.subject}</td>
                                <td>{score.score}</td>
                            </tr>
                    ))
                }
                </tbody>
            </table>
            <ButtonComponent disabled={submitting} onClick={fetchScores} label={submitting?'please wait...':'Get my scores'} />
            
            <Formik initialValues={initialValuesUsername} validationSchema={validationSchemaUsername} onSubmit={updateUsername}>
                {
                    formik=>(
                        <Form style={usernameStyle}>
                            <InputField name={'newUsername'} label={'New username: '} type={'text'} placeholder={'enter a new username'} />
                            <InputField name={'password'} label={'Password: '} type={'password'} placeholder={'enter your password'} />
                            <ButtonComponent disabled={submitting} type={'submit'} label={submitting?'please wait...':'update username'} />
                        </Form>
                    )
                }
            </Formik>
            <ButtonComponent onClick={()=>setUsernameStyle({display:''})} style={usernameStyle.display==='none' ?{display:''} :{display:'none'}} label={submitting?'please wait...':"Change my username"} disabled={submitting}/>
            
            <Formik initialValues={initialValuesPass} validationSchema={validationSchemaPass} onSubmit={updatePassword}>
                {
                    formik=>(
                        <Form style={passwordStyle}>
                            <InputField name={'password'} label={'Current Password:'} type={'password'} placeholder={'enter current password'} />
                            <InputField name={'newPassword'} label={'New Password: '} type={'password'} placeholder={'enter new password'} />
                            <InputField name={'confirm'} label={'Confirm new password:'} type={'password'} placeholder={'confirm new password'} />
                            <ButtonComponent disabled={submitting} type={'submit'} label={submitting?'please wait...':'update password'} />
                        </Form>
                    )
                }
            </Formik>
            <ButtonComponent onClick={()=>setPasswordStyle({display:''})} style={passwordStyle.display==='none' ?{display:''} :{display:'none'}} label={submitting?'please wait...':'Change my password'} disabled={submitting}/>
        </div>
    )
}

export default Profile

