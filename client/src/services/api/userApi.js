import axios from 'axios'
import{removeCookie, fetchCookie} from '../cookies'

const url= 'http://localhost:8000'

export const adminFetchScoreApi=async(data)=>{
    try {
        const user= await fetchCookie()
        const user_id= user.user_id
        const {username} = data
        const result= await axios.get(`${url}/user/admin/scores/${user_id}/${username}`, {withCredentials: true})
        if(result && result.data.result) return result.data.result
        return 'error fetching scores'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error fetching scores'
    }
}

export const delUserApi= async(data)=>{
    try {
        const user = await fetchCookie()
        data.user_id = user.user_id
        const result = await axios.post(`${url}/user/admin/delete`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error deleting username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error deleting username'
    }
}

export const dnGradeApi= async(data)=>{
    try {
        const user= await fetchCookie()
        data.user_id = user.user_id
        const result= await axios.post(`${url}/user/admin/dngrade`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error down grading username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error down grading username'
    }
}

export const resetPasswordApi= async(data)=>{
    try {
        const response = await axios.post(`${url}/user/self/reset`, data, {withCredentials: true})
        if(response.status===200) return response.status
        if(response.data.msg) return response.data.msg
    } catch (error) {
        if(error.response && error.response.data.msg) return error.response.data.msg
        return 'error resetting password'
    }
}

export const signInApi=async (data)=>{
    try {
        const response= await axios.post(`${url}/user/signin`, data, {withCredentials:true})
        if(response.status===200) return response.status
        return 'error logging you in'
    }catch(error){
        removeCookie()
        if (error.response && error.response.data) return error.response.data.msg
        return 'error logging you in'
    }
}

export const signoutApi=async()=>{
    try {
        const result = await axios.get(`${url}/user/signout`, {withCredentials: true})
        if(result.status===200){
            removeCookie()
            return result.status
        } else {
            removeCookie()
            return result.data.msg
        }
    } catch (error) {
        removeCookie()
        if(error.response && error.response.data) return error.response.data.msg
        return 'error logging you out. If error persists, contact admin.'
    }
}

export const signUpApi=async(data)=>{
    try {
        const result= await axios.post(`${url}/user/signup`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg)return error.response.data.msg
        return 'error signing you up'
    }
}

export const resetApi=async(data)=>{
    try {
        const user = await fetchCookie()
        data.user_id= user.user_id
        const result = await axios.post(`${url}/user/admin/reset`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error unflagging username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error unflagging username'
    }
}

export const updatePasswordApi=async(data)=>{
    try {
        const user= await fetchCookie()
        data.user_id = user.user_id
        const result = await axios.post(`${url}/user/update/password`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error updating password'
    }
}

export const updateUsernameApi=async(data)=>{
    try {
        const user= await fetchCookie()
        data.user_id = user.user_id
        const result= await axios.post(`${url}/user/update/username`, data, {withCredentials: true})
        if(result.status===200)return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error updating username'
    }
}

export const upgradeApi= async(data)=>{
    try {
        const user= await fetchCookie()
        data.user_id = user.user_id
        const result= await axios.post(`${url}/user/admin/upgrade`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error upgrading username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error upgrading username'
    }
}