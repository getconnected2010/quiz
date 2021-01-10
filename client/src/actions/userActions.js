import {fetchCookie, removeCookie} from '../services/cookies'

export const signInAction=()=>async(dispatch)=>{
    try {
        const user= await fetchCookie()
        dispatch({type:'SIGNIN', payload: user}) 
    } catch (error) {
        removeCookie()
    } 
}

export const signOutAction=()=>(dispatch)=>{
    try {
        dispatch({type: 'SIGNOUT'})
    } catch (error) {
        alert('error logging you out')
    }   
}