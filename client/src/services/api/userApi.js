import axios from 'axios'
import{removeCookie} from '../cookies'

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

export const signout=async()=>{
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