import axios from 'axios'
import{removeCookie, fetchCookie} from './cookies'

const url= 'http://localhost:8000'

export const addToListApi=async(data)=>{
    try {
        const user = await fetchCookie()
        data.user_id= user.user_id
        return await axios.post('http://localhost:8000/quiz/add', data, {withCredentials: true})
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
        return await axios.delete(`http://localhost:8000/quiz/delete/${delData}/${user_id}`, {withCredentials: true}, {headers: {"Content-type":"application/json"}} )
    } catch (error) {
        if(error.response&&error.response.data.msg) return alert(error.response.data.msg)
        alert('error deleting question')
    }
}

export const fetchQuizApi =async(subject)=>{
    try {
        return await axios.get(`http://localhost:8000/quiz/list/${subject}`, {withCredentials: true})
    } catch (error) {
        if(error.response&& error.response.data.msg) return alert(error.response.data.msg)
        alert('error fetching questions from database')
    }
}

export const fetchScoresApi=async()=>{
    const user= await fetchCookie()
    const user_id= user.user_id
    if(user_id!==null){
        try {
            const result= await axios.get(`http://localhost:8000/quiz/scores/${user_id}`, {withCredentials: true})
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
            await axios.post('http://localhost:8000/quiz/score', data, {withCredentials: true})
        } catch (error) {
            if(error.response && error.response.data.msg){
                alert(error.response.data.msg)
            }
        }
    }
}

export const resetPasswordApi= async(data)=>{
    try {
        const response = await axios.post('http://localhost:8000/user/reset', data, {withCredentials: true})
        if(response.data.msg){
            alert(response.data.msg)
        }
        if(response.status===200){
            return response.status
        }
    } catch (error) {
        if(error.response.data.msg){
            alert(error.response.data.msg)
        }
        console.log(error)
    }
}

export const signInApi=async (data)=>{
    try {
        const response= await axios.post('http://localhost:8000/user/signin', data, {withCredentials:true})
        if(response.status===200){
            return response.status
        }
    } catch (error) {
        removeCookie()
        if (error.response && error.response.data && error.response.data.msg) {
            alert(error.response.data.msg)
        } else {
            alert('error to log you in. If error persists, contact site admin.')
        }
    }
}

export const signoutApi=async()=>{
    try {
        await axios.post('http://localhost:8000/user/signout', {withCredentials: true})
        removeCookie()
    } catch (error) {
        removeCookie()
        if(error.response && error.response.data && error.response.data.msg){
            alert(error.response.data.msg)
        }else{
            alert('error logging you out. If error persists, contact admin.')
        }       
    }
}

export const signUpApi=async(data)=>{
    try {
        const result= await axios.post('http://localhost:8000/user/signup', data, {withCredentials: true})
        if(result.data.msg){
            alert(result.data.msg)
        }
        if(result.status===200){
            return result.status
        }
    } catch (error) {
        if(error.response.data.msg){
            alert(error.response.data.msg)
        }
        console.log(error)
    }
}

export const updatePasswordApi=async(data)=>{
    const user= await fetchCookie()
    data.user_id = user.user_id
    try {
        const result = await axios.post('http://localhost:8000/user/update/password', data, {withCredentials: true})
        alert(result.data.msg)
    } catch (error) {
        if(error.response&& error.response.data.msg) return alert(error.response.data.msg)
        alert('error updating password')
    }
}

export const updateUsernameApi=async(data)=>{
    const user= await fetchCookie()
    data.user_id = user.user_id
    try {
        const result= await axios.post('http://localhost:8000/user/update/username', data, {withCredentials: true})
        alert(result.data.msg)
    } catch (error) {
        if(error.response&& error.response.data.msg) return alert(error.response.data.msg)
        alert('error updating username')
    }
}