import React, {useState} from 'react'
import{Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../FormComponents'
import {adminFetchScoreApi} from '../../services/api/userApi'
import ModalPage from '../ModalPage'

const AdminFetchScores = ({setScores, setShowScores, submitting, setSubmitting}) => {
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()

    const gtScoreInit={username:''}
    const gtScoreSchema= Yup.object({
        username: Yup.string().required('Scores of which username?')
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.]+$/, 'username can only contain letters, numbers and special characters ~!@$^*()_+={}:;.')
                    .min(4)
                    .max(40)
    })
    const gtScoreSubmit=async(values, onSubmitProps)=>{
        setSubmitting(true)
        const result= await adminFetchScoreApi(values)
        if(Array.isArray(result)){
            setScores(result)
        } else{
            setScores([])
            setResponse(result)
            setStyleProp('Error')
            setOpenModal(true)
        }
        onSubmitProps.resetForm()
        setSubmitting(false)
    }
    const clear=()=>{
        const inp= document.getElementsByTagName('input')
        console.log(inp)
        console.log('clearing')
    }
    return (
    <>
        <ModalPage openModal={openModal} setOpenModal={setOpenModal} styleProp={styleProp} message={response} />
        <Formik initialValues={gtScoreInit} validationSchema={gtScoreSchema} onSubmit={gtScoreSubmit}>
            {
                formik=>(
                    <Form>
                        <InputField name={'username'} label={'Scores of which username?'} type={'text'} placeholder={'scores of which username to fetch?'} />
                        <ButtonComponent type={'submit'} disabled={submitting} label={submitting?'please wait...': 'Fetch scores'} />
                        <Link onClick={()=>setShowScores(false)} to='#'>Hide form</Link>
                    </Form>
                )
            }
        </Formik>
</>
    )
}

export default AdminFetchScores
