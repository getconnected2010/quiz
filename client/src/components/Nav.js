import React from 'react'
import{Link, useHistory} from 'react-router-dom'
import{useSelector, useDispatch} from 'react-redux'
import '../css/nav.css';
import {signoutApi} from '../services/api/userApi'
import {signOutAction} from '../actions/userActions'

const Nav = () => {
    const history= useHistory()
    const dispatch=useDispatch()
    const user = useSelector(state=>state.user)
    // const modalMessage = useSelector(state=>state.modalMessage)
    // console.log('in modal', modalMessage)
    // if(Object.keys(modalMessage).length !==0) {
    //     console.log('not empry')
    // }
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
            <Link to='/about'>About</Link>
            {
                admin==='true' && 
                <>
                    <Link to='/add'>Add to Quiz</Link>
                    <Link to='/admin'>Admin</Link>
                </>
            }

            {
                user_id?
                <>
                    <Link to='/profile'>My Profile</Link>
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


