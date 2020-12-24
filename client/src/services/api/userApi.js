import axios from 'axios'
import{removeCookie} from '../cookies'

export const loginApi=async (data)=>{
    try {
        await axios.post('http://localhost:8000/user/login', data, {withCredentials:true})
    } catch (error) {
        removeCookie()
        if (error.response && error.response.data && error.response.data.msg) {
            alert(error.response.data.msg)
        } else {
            alert('error to log you in. If error persists, contact site admin.')
        }
    }
}