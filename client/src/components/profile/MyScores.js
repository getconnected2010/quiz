import {useState} from 'react'
import {ButtonComponent} from '../FormComponents'
import {fetchMyScoresApi } from '../../services/api/quizApi'
import { Link } from 'react-router-dom'
import ModalPage from '../ModalPage'




const MyScores = ({submitting, setSubmitting, setScores}) => {
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()
    const fetchScores= async()=>{
        setSubmitting(true)
        const result = await fetchMyScoresApi()
        if(Array.isArray(result)){
            setScores(result)
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
            <ButtonComponent disabled={submitting} onClick={fetchScores} label={submitting?'please wait...':'Get my scores'} />
        </>
    )
}

export default MyScores
