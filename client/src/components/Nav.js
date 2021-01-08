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
    const user_id= user.user_id
    const admin= user.admin
    const logout=async()=>{
        await signoutApi()
        dispatch(signOutAction())
        history.push('/')
    }
    return (
        <div className='Nav'>
            <Link to='/'>Home</Link>
            {
                admin==='true' && <Link to='/add'>Add to Quiz</Link>
            }

            {
                user_id?
                <>
                    <Link to='/profile'>Profile</Link>
                    <button onClick={logout}>Logout</button>
                </>
                    :
                    <>
                    <button onClick={()=>history.push('/signin')}>Login</button>
                    <button onClick={()=>history.push('/signup')}>Sign Up</button>
                    </>
            }
        </div>
    )
}

export default Nav


