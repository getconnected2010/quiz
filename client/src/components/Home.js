import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import './css/home.css';
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
            <div className='buttons'>
                <h2>Pick a subject area from options below</h2>
                <ButtonComponent onClick={fetchGeneral} id={'general'} label={'General'} />

                <ButtonComponent onClick={fetchGeography} id={'geography'} label={'Geography'} />
                
                <ButtonComponent onClick={fetchScience} id={'science'} label={'Science'}/>

                <ButtonComponent onClick={fetchHistory} id={'history'} label={'History'}/>
            </div>
        </div>
    )
}

export default Home
