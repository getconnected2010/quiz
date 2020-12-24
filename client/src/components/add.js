import React from 'react'
import{useDispatch} from 'react-redux';
import {addAction} from '../actions/listActions';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './add.css';

function Add() {
    const dispatch = useDispatch()
    const initialValues={question:'', answer1:'', answer2:'', answer3:'', answer4:'', correct:''}
    const validationSchema= Yup.object({
        question: Yup.string().required('required'),
        answer1: Yup.string().required('required'),
        answer2: Yup.string().required('required'),
        answer3: Yup.string().required('required'),
        answer4: Yup.string().required('required'),
        correct: Yup.string().required('required')
                    .oneOf([Yup.ref('answer1'), Yup.ref('answer2'), Yup.ref('answer3'), Yup.ref('answer4')],'the correct answer must match one of the answer options')
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
                    <label htmlFor='question'>Question:</label>
                    <Field type='text' name='question' placeholder='enter the question' />
                    <span style={{color: 'red'}}><ErrorMessage name='question' /></span>

                    <label htmlFor='answer1'>Answer #1:</label>
                    <Field type='text' name='answer1' placeholder='answer option #1' />
                    <span style={{color: 'red'}}><ErrorMessage name='answer1' /></span>

                    <label htmlFor='answer2'>Answer #2:</label>
                    <Field type='text' name='answer2' placeholder='answer option #2' />
                    <span style={{color: 'red'}}><ErrorMessage name='answer2' /></span>

                    <label htmlFor='answer3'>Answer #3:</label>
                    <Field type='text' name='answer3' placeholder='answer option #3' />
                    <span style={{color: 'red'}}><ErrorMessage name='answer3' /></span>
             
                    <label htmlFor='answer4'>Answer #4:</label>
                    <Field type='text' name='answer4' placeholder='answer option #4' />
                    <span style={{color: 'red'}}><ErrorMessage name='answer4' /></span>
           
                    <label htmlFor='correct'>Correct answer:</label>
                    <Field type='text' name='correct' placeholder='enter the correct answer' />
                    <span style={{color: 'red'}}><ErrorMessage name='correct' /></span>
             
               <button type='submit'>Submit</button>
            </Form>
        </div>
       </Formik>
    )
}

export default Add
