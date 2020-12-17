import React, {useState} from 'react'
import{useSelector} from 'react-redux'
import Modal from 'react-modal';
import './qaList.css';

const List=()=>{
    const quiz= useSelector(state=>state.qa)
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
    console.log(answers)
    Modal.setAppElement('#root')
    return(
    <div className='qaList'>
        <Modal isOpen={openModal} >
            <div className='Modal'>
                <h1>Your score is {score}</h1>
                <button onClick={()=>setOpenModal(false)}>Close</button>
            </div>
        </Modal>
        <form onSubmit={handleSubmit} onChange={handleChange}>
            {
                quiz.map((qa, index)=>(
                    <div key={index} className='qa'>
                        {/* question */}
                        <div className='q'>
                           {qa.question}
                        </div> 
                        {/* answers */}
                        <div className='a-parent'>
                            <div className='a'>
                                <label>{qa.answer1}</label>
                                <input type="radio" name={qa.question+index} value={qa.answer1===qa.correct}/>
                            </div>

                            <div className='a'>
                                <label>{qa.answer2}</label>
                                <input type="radio" name={qa.question+index} value={qa.answer2===qa.correct} />
                            </div>

                            <div className='a'>
                                <label>{qa.answer3}</label>
                                <input type="radio" name={qa.question+index} value={qa.answer3===qa.correct} />
                            </div>

                            <div className='a'>
                                <label>{qa.answer4}</label>
                                <input type="radio" name={qa.question+index} value={qa.answer4===qa.correct} />
                            </div>

                        </div>
                    </div>
                ))
            }
            <button type='submit'>Submit Answers</button>
        </form>
    </div>
    )
}
export default List;