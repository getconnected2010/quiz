import React from 'react'
import{Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../FormComponents'
import {adminFetchScoreApi} from '../../services/api'

const AdminFetchScores = ({setScores, setShowScores, submitting, setSubmitting}) => {
    const gtScoreInit={userScore:''}
    const gtScoreSchema= Yup.object({
        userScore: Yup.string().required('Scores of which username?')
    })
    const gtScoreSubmit=async(values, onSubmitProps)=>{
        setSubmitting(true)
        const result= await adminFetchScoreApi(values)
        setScores(result)
        onSubmitProps.resetForm()
        setSubmitting(false)
    }
    return (
        <Formik initialValues={gtScoreInit} validationSchema={gtScoreSchema} onSubmit={gtScoreSubmit}>
            {
                formik=>(
                    <Form>
                        <InputField name={'userScore'} label={'Scores of which username?'} type={'text'} placeholder={'scores of which username to fetch?'} />
                        <ButtonComponent type={'submit'} disabled={submitting} label={submitting?'please wait...': 'Fetch scores'} />
                        <Link onClick={()=>setShowScores(false)} to='#'>Hide form</Link>
                    </Form>
                )
            }
        </Formik>
    )
}

export default AdminFetchScores
