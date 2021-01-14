import React, {useState} from 'react'
import{useSelector, useDispatch} from 'react-redux'
import{Link} from 'react-router-dom'
import '../css/qaList.css';
import {deleteAction} from '../actions/listActions'
import Paginate from './Paginate'
import {recordScoreApi, deleteQaApi} from '../services/api/quizApi'
import ModalPage from './ModalPage';

const QaList=()=>{
    const dispatch = useDispatch()
    const list= useSelector(state=>state.qa)
    const user = useSelector(state=>state.user)
    const {admin} = user
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()
    const[submitting, setSubmitting] = useState(false)
    const [startIndex, setStartIndex] = useState(0)
    const listPerPage = 5
    const endIndex = startIndex + listPerPage
    const quiz = list.slice(startIndex, endIndex)
    const [answers, setAnswers] = useState({})
    const [subject, setSubject] = useState(null)
    const [score, setScore] = useState(0)
    
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
        setSubmitting(true)
        const result= await recordScoreApi({subject: subject, score: score})
        if(result===undefined|| result.status===200){
            setResponse(`Your score is ${score}`)
            setStyleProp('Score')
        }else{
            setResponse(result)
            setStyleProp('Error')
        }
        setOpenModal(true)
        setSubmitting(false)
    }
    const deleteQA=async (e)=>{
        e.preventDefault()
        setSubmitting(true)
        const result= await deleteQaApi(e.target.id)
        if(result.status===200) {
            dispatch(deleteAction(e.target.id))
            setStyleProp('Success')
            setResponse(result.data.msg)
        }else{
            setStyleProp('Error')
            setResponse(result)
        } 
        setOpenModal(true) 
        setSubmitting(false)
    }
    return(
    <>
        <ModalPage styleProp={styleProp} openModal={openModal} setOpenModal={setOpenModal} message={response}/>
        <div className='qaList'>
            {
                list.length===0&& 
                    <h1>
                        Questions unavailable. 
                        <br/> Please choose another subject from the
                        <br/>
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
            {startIndex>=list.length && list.length>0 && 
                    <button disabled={!subject||submitting} onClick={checkScore}>
                        {subject? 'Check Your Score':'You have to answer atleast one question...'}
                    </button>
            }
        </div>
        <Paginate list={list} setStartIndex={setStartIndex} startIndex={startIndex} listPerPage={listPerPage} />   
    </>
    )
}
export default QaList;