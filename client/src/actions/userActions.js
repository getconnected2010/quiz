import {fetchCookie, removeCookie} from '../services/cookies'

export const signInAction=()=>async(dispatch)=>{
    try {
        const user= await fetchCookie()
        dispatch({type:'SIGNIN', payload: user}) 
    } catch (error) {
        removeCookie()
        console.log(error)
    } 
}

export const signOutAction=()=>(dispatch)=>{
    try {
        dispatch({type: 'SIGNOUT'})
    } catch (error) {
        console.log(error)
    }   
}