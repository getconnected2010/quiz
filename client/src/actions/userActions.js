import {fetchCookie, removeCookie} from '../services/cookies'

export const LoginAction=()=>async(dispatch)=>{
    try {
        const user= await fetchCookie()
        dispatch({type:'SIGNIN', payload: user}) 
    } catch (error) {
        removeCookie()
        console.log(error)
    } 
}