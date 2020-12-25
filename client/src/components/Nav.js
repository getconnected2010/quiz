import React from 'react'
import{Link, useHistory} from 'react-router-dom'
import{useSelector, useDispatch} from 'react-redux'
import './nav.css';
import {signout} from '../services/api/userApi'
import {signOutAction} from '../actions/userActions'

const Nav = () => {
    const history= useHistory()
    const dispatch=useDispatch()
    const user = useSelector(state=>state.user)
    console.log(user)
    const user_id= user.user_id
    const admin= user.admin
    const logout=async()=>{
        await signout()
        dispatch(signOutAction())
        history.push('/')
    }
    return (
        <div className='Nav'>
            <Link to='/'>Home</Link>
            <Link to='/add'>Add to Quiz</Link>
            <Link to='/list'>Take Quiz</Link>
            <>
            {
                user_id?
                    <button style={{borderRadius:'10px', padding:'5px 15px', background:'green', border:'2px solid white', color:'white', fontWeight:'bolder'}} onClick={logout} type='submit' >Logout</button>
                    :
                    <button style={{borderRadius:'10px', padding:'5px 15px', background:'green', border:'2px solid white', color:'white', fontWeight:'bolder'}} onClick={()=>history.push('/signin')}>Login</button>
            }
            </>
        </div>
    )
}

export default Nav


