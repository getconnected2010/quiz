import axios from 'axios'
import{fetchCookie} from '../cookies'

const url= 'http://localhost:8000'


export const addToListApi=async(data)=>{
    try {
        const user = await fetchCookie()
        data.user_id= user.user_id
        return await axios.post(`${url}/quiz/add`, data, {withCredentials: true})
    } catch (error) {
        if(error.response&& error.response.data.msg){
            alert(error.response.data.msg)
            return error.response.data.msg
        }
    }
}

export const deleteQaApi =async(delData)=>{
    try {
        const user = await fetchCookie()
        const user_id= user.user_id
        return await axios.delete(`${url}/quiz/delete/${delData}/${user_id}`, {withCredentials: true}, {headers: {"Content-type":"application/json"}} )
    } catch (error) {
        if(error.response&&error.response.data.msg) return alert(error.response.data.msg)
        alert('error deleting question')
    }
}

export const fetchQuizApi =async(subject)=>{
    try {
        return await axios.get(`${url}/quiz/list/${subject}`, {withCredentials: true})
    } catch (error) {
        if(error.response&& error.response.data.msg) return alert(error.response.data.msg)
        alert('error fetching questions from database')
    }
}

export const fetchMyScoresApi=async()=>{
    const user= await fetchCookie()
    const user_id= user.user_id
    if(user_id!==null){
        try {
            const result= await axios.get(`${url}/quiz/scores/${user_id}`, {withCredentials: true})
            return result.data.result
        } catch (error){
            if(error.response && error.response.data.msg) return alert(error.response.data.msg)
            alert('error retrieving your scores')
        }
    }
}

export const recordScoreApi=async(data)=>{
    const user= await fetchCookie()
    const user_id= user.user_id
    if(user_id!==null){
        try {
            data.user_id= user_id
            await axios.post(`${url}/quiz/score`, data, {withCredentials: true})
        } catch (error) {
            if(error.response && error.response.data.msg) return alert(error.response.data.msg)
            alert('error recording your score')
        }
    }
}