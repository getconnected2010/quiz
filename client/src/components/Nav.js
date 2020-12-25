import React from 'react'
import{Link, useHistory} from 'react-router-dom'
import{useSelector} from 'react-redux'
import{Form} from 'formik'
import './nav.css';
import {signout} from '../services/api/userApi'
import {signOutAction} from '../actions/userActions'

const Nav = () => {
    const history= useHistory()
    const user = useSelector(state=>state.user)
    const user_id= user.user_id
    const admin= user.admin
    console.log(user_id)
    const logout=async()=>{
        await signout()
        signOutAction()
        history.push('/')
    }
    return (
        <div className='Nav'>
            <Link to='/'>Home</Link>
            <Link to='/add'>Add to Quiz</Link>
            <Link to='/list'>Take Quiz</Link>
            <div>
            {
                user_id?
                    <form>
                        <button type='submit' onClick={logout}>Logout</button>
                    </form>
                    :
                    <button onClick={()=>history.push('/signin')}>Login</button>
            }
            </div>
        </div>
    )
}

export default Nav


