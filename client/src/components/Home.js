import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import './home.css';
import{ButtonComponent} from './FormComponents'
import {fetchQuizAction} from '../actions/listActions'

const Home = () => {
    const history= useHistory()
    const dispatch = useDispatch()

    const fetchGeneral=(e)=>{
        dispatch(fetchQuizAction(e.target.id))
        history.push('/list')
    }
    const fetchGeography=(e)=>{
        dispatch(fetchQuizAction(e.target.id))
        history.push('/list')
    }
    const fetchScience=(e)=>{
        dispatch(fetchQuizAction(e.target.id))
        history.push('/list')
    }
    const fetchHistory=(e)=>{
        dispatch(fetchQuizAction(e.target.id))
        history.push('/list')
    }
    return (
        <div className='HomePage'>
            <h1>Welcome to quiz app</h1>
            <p>
                Tests are part of learning. This quiz app has questions with multiple choice answers. 
                Select 'Take Quiz' tab where you will find a list of all the questions and answer options.
                Choose the correct answers for each question and click submit. 
                Your score is automatically calculated and displayed. 
            <br/><br/>
                If your account has an admin privilege, you can add to the list of questions. 
                Contact your admin to upgrade access level.
            </p>
            <div >
                <h2>Pick a subject area from the options below</h2>
                <div className='buttons'>
                <ButtonComponent onClick={fetchGeneral} id={'general'} label={'General'} />

                <ButtonComponent onClick={fetchGeography} id={'geography'} label={'Geography'} />
                
                <ButtonComponent onClick={fetchScience} id={'science'} label={'Science'}/>

                <ButtonComponent onClick={fetchHistory} id={'history'} label={'History'}/>
                
                </div>
            </div>
        </div>
    )
}

export default Home
