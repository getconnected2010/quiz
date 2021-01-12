import axios from 'axios'
import{removeCookie, fetchCookie} from '../cookies'

const url= 'http://localhost:8000'

export const adminFetchScoreApi=async(data)=>{
    try {
        const user= await fetchCookie()
        const user_id= user.user_id
        const {userScore} = data
        const result= await axios.get(`${url}/user/admin/scores/${user_id}/${userScore}`, {withCredentials: true})
        if(result && result.data.result) return result.data.result
    } catch (error) {
        if(error.response&& error.response.data.msg) {
            alert(error.response.data.msg)
            return[]
        }
        alert('error down grading username')
        return[]
    }
}

export const delUserApi= async(data)=>{
    try {
        const user = await fetchCookie()
        data.user_id = user.user_id
        const result = await axios.post(`${url}/user/admin/delete`, data, {withCredentials: true})
        if(result.status===200) return alert('username successfully deleted')
    } catch (error) {
        if(error.response&& error.response.data.msg) return alert(error.response.data.msg)
        alert('error deleting username')
    }
}

export const dnGradeApi= async(data)=>{
    try {
        const user= await fetchCookie()
        data.user_id = user.user_id
        const result= await axios.post(`${url}/user/admin/dngrade`, data, {withCredentials: true})
        if(result && result.data.msg) return alert(result.data.msg)
    } catch (error) {
        if(error.response&& error.response.data.msg) return alert(error.response.data.msg)
        alert('error down grading username')
    }
}

export const resetPasswordApi= async(data)=>{
    try {
        const response = await axios.post(`${url}/user/self/reset`, data, {withCredentials: true})
        if(response.data.msg) return alert(response.data.msg)
        if(response.status===200) return response.status
    } catch (error) {
        if(error.response && error.response.data.msg) return alert(error.response.data.msg)
        alert('error resetting password')
    }
}

export const signInApi=async (data)=>{
    try {
        const response= await axios.post(`${url}/user/signin`, data, {withCredentials:true})
        if(response.status===200) return response.status
    }catch(error){
        removeCookie()
        if (error.response && error.response.data) return error.response.data.msg
        return 'error logging you in'
    }
}

export const signoutApi=async()=>{
    try {
        await axios.get(`${url}/user/signout`, {withCredentials: true})
        removeCookie()
    } catch (error) {
        removeCookie()
        if(error.response && error.response.data) return alert(error.response.data.msg)
        alert('error logging you out. If error persists, contact admin.')  
    }
}

export const signUpApi=async(data)=>{
    try {
        const result= await axios.post(`${url}/user/signup`, data, {withCredentials: true})
        if(result.data.msg) return alert(result.data.msg)
        if(result.status===200) return result.status
    } catch (error) {
        if(error.response&& error.response.data.msg)return alert(error.response.data.msg)
        alert('error signing you up')
    }
}

export const unflagApi=async(data)=>{
    try {
        const user = await fetchCookie()
        data.user_id= user.user_id
        const result = await axios.post(`${url}/user/admin/unflag`, data, {withCredentials: true})
        if(result.status===200) alert('username successfully unflagged')
    } catch (error) {
        if(error.response&& error.response.data.msg) return alert(error.response.data.msg)
        alert('error unflagging username')
    }
}

export const updatePasswordApi=async(data)=>{
    try {
        const user= await fetchCookie()
        data.user_id = user.user_id
        const result = await axios.post(`${url}/user/update/password`, data, {withCredentials: true})
        alert(result.data.msg)
    } catch (error) {
        if(error.response&& error.response.data.msg) return alert(error.response.data.msg)
        alert('error updating password')
    }
}

export const updateUsernameApi=async(data)=>{
    try {
        const user= await fetchCookie()
        data.user_id = user.user_id
        const result= await axios.post(`${url}/user/update/username`, data, {withCredentials: true})
        alert(result.data.msg)
    } catch (error) {
        if(error.response&& error.response.data.msg) return alert(error.response.data.msg)
        alert('error updating username')
    }
}

export const upgradeApi= async(data)=>{
    try {
        const user= await fetchCookie()
        data.user_id = user.user_id
        const result= await axios.post(`${url}/user/admin/upgrade`, data, {withCredentials: true})
        alert(result.data.msg)
    } catch (error) {
        if(error.response&& error.response.data.msg) return alert(error.response.data.msg)
        alert('error upgrading username')
    }
}