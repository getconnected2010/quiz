import { Redirect, Route } from 'react-router-dom'
import {useSelector} from 'react-redux'

export const AdminProtectedRoute=({component: Component, ...rest})=>{
    const user = useSelector(state => state.user)
    const admin = user.admin
    const user_id= user.user_id
    return(
        <Route {...rest} render={(props)=>{
            if(user_id!==null && admin==='true') return <Component {...props} />
            if(user_id!==null && admin==='false') return <Redirect to='/' />
            if(user_id===null) return <Redirect to='/signin' />
        }} />
    )
}

export const UserAlreadyLoggedRoute =({component: Component, ...rest})=>{
    const user = useSelector(state=>state.user)
    const user_id= user.user_id
    return(
        <Route {...rest} render={(props)=>{
            if (user_id===null) return <Component {...props} />
            if(user_id!==null) return <Redirect to='/' />
        }}  />
    )
}
