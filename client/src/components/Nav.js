import React from 'react'
import{Link} from 'react-router-dom'
import './nav.css';

const Nav = () => {
    return (
        <div className='Nav'>
            <Link to='/'>Home</Link>
            <Link to='/add'>Add to Quiz</Link>
            <Link to='/list'>Take Quiz</Link>
        </div>
    )
}

export default Nav


