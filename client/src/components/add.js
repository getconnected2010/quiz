import React from 'react'
import{useDispatch} from 'react-redux';
import {addAction} from '../actions/listActions';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import './css/add.css';
import{InputField, ButtonComponent, SelectField} from './FormComponents'

function Add() {
    const dispatch = useDispatch()
    const initialValues={question:'', answer1:'', answer2:'', answer3:'', answer4:'', correct:'', subject:''}
    const selectOptions= ['', 'Geography', 'General', 'Science', 'History']
    const validationSchema= Yup.object({
        question: Yup.string().required('required'),
        answer1: Yup.string().required('required'),
        answer2: Yup.string().required('required'),
        answer3: Yup.string().required('required'),
        answer4: Yup.string().required('required'),
        correct: Yup.string().required('required')
                    .oneOf([Yup.ref('answer1'), Yup.ref('answer2'), Yup.ref('answer3'), Yup.ref('answer4')],'the correct answer must match one of the answer options'),
        subject: Yup.string().required('required')
                    .oneOf(selectOptions)
    })
    const onSubmit=(values, onSubmitProps)=>{
        dispatch(addAction(values))
        onSubmitProps.resetForm()
    }
    return (
       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <div className='Form'>
            <h1>Question and Answers</h1>
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
    )
}

export default Add
