import React from 'react'
import{Link, useHistory} from 'react-router-dom'
import{useSelector, useDispatch} from 'react-redux'
import './nav.css';
import {signoutApi} from '../services/api'
import {signOutAction} from '../actions/userActions'

const Nav = () => {
    const history= useHistory()
    const dispatch=useDispatch()
    const user = useSelector(state=>state.user)
    const NavButton = {margin:'0px 15px', borderRadius:'10px', padding:'5px 15px', background:'green', border:'2px solid white', color:'white', fontWeight:'bolder'}
    const user_id= user.user_id
    const logout=async()=>{
        await signoutApi()
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
                    <button style={NavButton} onClick={logout}>Logout</button>
                    :
                    <div>
                    <button style={NavButton} onClick={()=>history.push('/signin')}>Login</button>
                    <button style={NavButton} onClick={()=>history.push('/signup')}>Sign Up</button>
                    </div>
            }
            </>
        </div>
    )
}

export default Nav


