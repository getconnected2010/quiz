import axios from 'axios'
import{removeCookie, fetchCookie} from './cookies'

export const signInApi=async (data)=>{
    try {
        await axios.post('http://localhost:8000/user/signin', data, {withCredentials:true})
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

export const addToListApi=async(data)=>{
    try {
        const user = await fetchCookie()
        data.user_id= user.user_id
        return await axios.post('http://localhost:8000/quiz/add', data, {withCredentials: true})
    } catch (error) {
        if(error.message && error.response.data && error.response.data.msg){
            alert(error.response.data.msg)
            return error.response.data.msg
        }
        console.log(error.response)
    }
}

export const fetchAllListApi =async()=>{
    try {
        return await axios.get('http://localhost:8000/quiz/list', {withCredentials: true})
    } catch (error) {
        console.log(error)
    }
}

export const deleteQaApi =async(delData)=>{
    try {
        const user = await fetchCookie()
        const user_id= user.user_id
        return await axios.delete(`http://localhost:8000/quiz/delete/${delData}/${user_id}`, {withCredentials: true}, {headers: {"Content-type":"application/json"}} )
    } catch (error) {
        if(error.response.data.msg){
            alert(error.response.data.msg)
        }
        console.log(error) 
        return error
    }
}