import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useSelector} from 'react-redux'

const ProtectedRoutes=({component: Component, ...rest})=>{
    const user = useSelector(state => state.user)
    const admin = user.admin
    return(
        <Route {...rest} render={(props)=>{
            if(admin) return <Component {...props} />
            if(!admin) return <Redirect to='/signin' />
        }} />
    )
}
export default ProtectedRoutes
