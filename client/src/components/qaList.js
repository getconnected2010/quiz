import React, {useState} from 'react'
import{useSelector, useDispatch} from 'react-redux'
import Modal from 'react-modal';
import './qaList.css';
import {deleteQA} from '../actions/listActions'
import Paginate from './Paginate'

const QaList=()=>{
    const list= useSelector(state=>state.qa)
    const user = useSelector(state=>state.user)
    const admin = user.admin
    const [startIndex, setStartIndex] = useState(0)
    const listPerPage = 5
    const endIndex = startIndex + listPerPage
    const quiz = list.slice(startIndex, endIndex)
    const dispatch = useDispatch()
    const [answers, setAnswers] = useState({})
    const [score, setScore] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const handleChange =(e)=>{
        setAnswers({...answers, [e.target.name]: e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setScore(Object.values(answers).filter(item=>item==="true").length)
        const radios = document.querySelectorAll("input[type='radio']")
        radios.forEach(radio=>radio.checked=false)
        setStartIndex(endIndex)
    }
    const checkScore=(e)=>{
        setOpenModal(true)
    }
    const removeQA=(e)=>{
        e.preventDefault()
        dispatch(deleteQA(e.target.id))
    }
    Modal.setAppElement('#root')
    return(
    <div className='qaList'>
        <Modal isOpen={openModal} >
            <div className='Modal'>
                <h1>Your score is {score}</h1>
                <button onClick={()=>setOpenModal(false)}>Close</button>
            </div>
        </Modal>
        {/* Q & A list */}
        <form onChange={handleChange}>
            {
                quiz.map(qa=>(
                    <div key={qa.id} className='qa'>
                        {/* question */}
                        <div className='q'>
                           {qa.question}
                           {admin==='true' && <button id={qa.id} onClick={removeQA}>Delete</button>}
                        </div> 
                        {/* answers */}
                        <div className='a-parent'>
                            <div className='a'>
                                <label>{qa.answer1}</label>
                                <input type="radio" name={qa.question+qa.id} value={qa.answer1===qa.correct}/>
                            </div>

                            <div className='a'>
                                <label>{qa.answer2}</label>
                                <input type="radio" name={qa.question+qa.id} value={qa.answer2===qa.correct} />
                            </div>

                            <div className='a'>
                                <label>{qa.answer3}</label>
                                <input type="radio" name={qa.question+qa.id} value={qa.answer3===qa.correct} />
                            </div>

                            <div className='a'>
                                <label>{qa.answer4}</label>
                                <input type="radio" name={qa.question+qa.id} value={qa.answer4===qa.correct} />
                            </div>

                        </div>
                    </div>
                ))
            }
            {quiz.length>0 && <button type='submit' onClick={handleSubmit}>Submit Answers >>> </button>}
        </form>
        {startIndex>list.length && <button onClick={checkScore}>Check Your Score</button>}
        <Paginate list={list} setStartIndex={setStartIndex} startIndex={startIndex} listPerPage={listPerPage} />   
    </div>
    )
}
export default QaList;