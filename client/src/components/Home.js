import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import '../css/home.css';
import{ButtonComponent} from './FormComponents'
import {fetchQuizAction} from '../actions/listActions'
import {fetchQuizApi} from '../services/api/quizApi'
import ModalPage from './ModalPage'

const Home = () => {
    const history= useHistory()
    const dispatch = useDispatch()
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()
    const[submitting, setSubmitting] = useState(false)

    const fetchQuiz=async(e)=>{
        setSubmitting(true)
        const result= await (fetchQuizApi(e.target.id))
        if(Array.isArray(result.data)){
            dispatch(fetchQuizAction(result.data))
            history.push('/list')
        }else{
            setResponse(result)
            setStyleProp('Error')
            setOpenModal(true)
        }
        setSubmitting(false)
    }

    return (
    <>
        <ModalPage openModal={openModal} setOpenModal={setOpenModal} message={response} styleProp={styleProp}/>
        <div className='HomePage'>
            <h1>Welcome to quiz app</h1>  
            <div className='buttons'>
                <h2>Pick a subject area from options below</h2>
                <ButtonComponent disabled={submitting} onClick={fetchQuiz} id={'General'} label={submitting?'Please wait...':'General'} />

                <ButtonComponent disabled={submitting} onClick={fetchQuiz} id={'Geography'} label={submitting?'Please wait...':'Geography'} />
                
                <ButtonComponent disabled={submitting} onClick={fetchQuiz} id={'Science'} label={submitting?'Please wait...':'Science'}/>

                <ButtonComponent disabled={submitting} onClick={fetchQuiz} id={'History'} label={submitting?'Please wait...':'History'}/>
            </div>
        </div>
    </>
    )
}

export default Home
