import Cookies from 'universal-cookie';
import jwt from 'jwt-decode'

const cookie= new Cookies();

export const fetchCookie=()=>{
    try {
        const userJwt= cookie.get('userToken')
        const user= jwt(userJwt)
        return user
    } catch (error) {
        return {user_id: null, admin: false}
    } 
}

export const removeCookie=()=>{
    try {
        cookie.remove('userToken')
    } catch (error) {
        console.log(error)
    }
}