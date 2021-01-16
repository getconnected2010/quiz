import React, {useState} from 'react'
import{useDispatch} from 'react-redux';
import {addAction} from '../actions/listActions';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import '../css/add.css';
import{InputField, ButtonComponent, SelectField} from './FormComponents'
import {addToListApi} from '../services/api/quizApi'
import ModalPage from './ModalPage'

function Add() {
    const dispatch = useDispatch()
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()
    const[submitting, setSubmitting] = useState(false)

    const initialValues={question:'', answer1:'', answer2:'', answer3:'', answer4:'', correct:'', subject:''}
    const selectOptions= ['', 'Geography', 'General', 'Science', 'History']
    const validationSchema= Yup.object({
        question: Yup.string().required('required')
                    .max(45)
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.?|#%&-]+$/, 'question can only contain letters, numbers and special characters ~!@$^*()_+={}:;.?|#%&-'),
        answer1: Yup.string().required('required')
                    .max(45)
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.?|#%&-]+$/, 'answer #1 can only contain letters, numbers and special characters ~!@$^*()_+={}:;.?|#%&-'),
        answer2: Yup.string().required('required')
                    .max(45)
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.?|#%&-]+$/, 'answer #2 can only contain letters, numbers and special characters ~!@$^*()_+={}:;.?|#%&-'),
        answer3: Yup.string().required('required')
                    .max(45)
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.?|#%&-]+$/, 'answer #3 can only contain letters, numbers and special characters ~!@$^*()_+={}:;.?|#%&-'),
        answer4: Yup.string().required('required')
                    .max(45)
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.?|#%&-]+$/, 'answer #4 can only contain letters, numbers and special characters ~!@$^*()_+={}:;.?|#%&-'),
        correct: Yup.string().required('required')
                    .oneOf([Yup.ref('answer1'), Yup.ref('answer2'), Yup.ref('answer3'), Yup.ref('answer4')],'the correct answer must match one of the answer options'),
        subject: Yup.string().required('required')
                    .oneOf(selectOptions)
    })
    const onSubmit= async (values, onSubmitProps)=>{
        const result = await addToListApi(values)
        if(result.status===200){
            values.id = result.data.insertId
            dispatch(addAction(values))
            setResponse('successfully added question to database')
            setStyleProp('Success')
        }else{
            setResponse(result)
            setStyleProp('Error')
        }
        setOpenModal(true)
        onSubmitProps.resetForm()
        setSubmitting(false)
    }
    return (
    <>
        <ModalPage openModal={openModal} setOpenModal={setOpenModal} message={response} styleProp={styleProp}/>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <div className='Form'>
            <h1>Enter Question and Answers</h1>
            <Form>
                <SelectField label={'Select a subject area : '} name={'subject'} selectOptions={selectOptions} />

                <InputField label={'Question: '} name={'question'} type={'text'} placeholder={'enter the question'} />

                <InputField label={'Answer #1: '} name={'answer1'} type={'text'} placeholder={'answer option #1'} />
                
                <InputField label={'Answer #2: '} name={'answer2'} type={'text'} placeholder={'answer option #2'} />
                
                <InputField label={'Answer #3: '} name={'answer3'} type={'text'} placeholder={'answer option #3'} />
                
                <InputField label={'Answer #4: '} name={'answer4'} type={'text'} placeholder={'answer option #4'} />
                
                <InputField label={'Correct answer: '} name={'correct'} type={'text'} placeholder={'enter the correct answer'} />

                <ButtonComponent type={'submit'} label={'Submit'} />
             
            </Form>
        </div>
       </Formik>
    </>
    )
}

export default Add
