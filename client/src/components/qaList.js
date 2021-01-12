import React, {useState} from 'react'
import{useSelector, useDispatch} from 'react-redux'
import{Link} from 'react-router-dom'
import '../css/qaList.css';
import {deleteAction} from '../actions/listActions'
import Paginate from './Paginate'
import {recordScoreApi} from '../services/api'
import AlertModal from './AlertModal';

const QaList=()=>{
    const dispatch = useDispatch()
    const list= useSelector(state=>state.qa)
    const user = useSelector(state=>state.user)
    const {admin} = user
    const [startIndex, setStartIndex] = useState(0)
    const listPerPage = 5
    const endIndex = startIndex + listPerPage
    const quiz = list.slice(startIndex, endIndex)
    const [answers, setAnswers] = useState({})
    const [subject, setSubject] = useState(null)
    const [score, setScore] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const handleChange =(e)=>{
        setAnswers({...answers, [e.target.name]: e.target.value})
        setSubject(e.target.id)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setScore(Object.values(answers).filter(item=>item==="true").length)
        const radios = document.querySelectorAll("input[type='radio']")
        radios.forEach(radio=>radio.checked=false)
        setStartIndex(endIndex)
    }
    const checkScore=async()=>{
        await recordScoreApi({subject: subject, score: score})
        setOpenModal(true)
    }
    const deleteQA=(e)=>{
        e.preventDefault()
        dispatch(deleteAction(e.target.id))
    }
    //Modal.setAppElement('#root')
    return(
    <div className='qaList'>
        <AlertModal style={'Score'} openModal={openModal} setOpenModal={setOpenModal} message={`Your score is ${score}`}/>
        {/* <Modal isOpen={openModal} >
            <div className='Modal'>
                <h1>Your score is {score}</h1>
                <button onClick={()=>setOpenModal(false)}>Close</button>
            </div>
        </Modal> */}
        {
            list.length===0&& 
                <h1>
                    Questions unavailable. Choose another subject from
                    {<Link to='/'> Home page</Link>}
                </h1>
        }
        <form onChange={handleChange}>
            {
                quiz.map(qa=>(
                    <div key={qa.id} className='qa'>
                        {/* question */}
                        <div className='q'>
                           {qa.question}
                           {admin==='true' && <button id={qa.id} onClick={deleteQA}>Delete</button>}
                        </div> 
                        {/* answers */}
                        <div className='a-parent'>
                            <div className='a'>
                                <label>{qa.answer1}</label>
                                <input type="radio" name={qa.question+qa.id} id={qa.subject} value={qa.answer1===qa.correct}/>
                            </div>
                            <div className='a'>
                                <label>{qa.answer2}</label>
                                <input type="radio" name={qa.question+qa.id} id={qa.subject} value={qa.answer2===qa.correct} />
                            </div>
                            <div className='a'>
                                <label>{qa.answer3}</label>
                                <input type="radio" name={qa.question+qa.id} id={qa.subject} value={qa.answer3===qa.correct} />
                            </div>
                            <div className='a'>
                                <label>{qa.answer4}</label>
                                <input type="radio" name={qa.question+qa.id} id={qa.subject} value={qa.answer4===qa.correct} />
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