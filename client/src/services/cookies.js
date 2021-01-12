import Cookies from 'universal-cookie';
import jwt from 'jwt-decode'

const cookie= new Cookies();

export const fetchCookie=async ()=>{
    try {
        const userJwt= await cookie.get('userToken')
        const user= await jwt(userJwt)
        return user
    } catch (error) {
        return {user_id: null, admin: false}
    } 
}

export const removeCookie=()=>{
    try {
        cookie.remove('userToken')
    } catch (error) {
        alert('error removing cookies from your browser')
    }
}