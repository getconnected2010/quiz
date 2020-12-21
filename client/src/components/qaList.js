import React, {useState} from 'react'
import{useSelector, useDispatch} from 'react-redux'
import Modal from 'react-modal';
import './qaList.css';
import {deleteQA} from '../actions/listActions'

const QaList=()=>{
    const quiz= useSelector(state=>state.qa)
    const admin = useSelector(state=>state.admin)
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
                           <button id={qa.id} onClick={removeQA}>Delete</button>
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
            <button type='submit' onClick={handleSubmit}>Submit Answers</button>
        </form>
    </div>
    )
}
export default QaList;