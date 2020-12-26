import React from 'react'
import './home.css';

const Home = () => {
    return (
        <div className='HomePage'>
            <h1>Welcome to your quiz app</h1>
            <p>
                Tests are part of learning. This quiz app has questions with multiple choice answers. 
                Select 'Take Quiz' tab where you will find a list of all the questions and answer options.
                Choose the correct answers for each question and click submit. 
                Your score is automatically calculated and displayed. 
            <br/><br/>
                If your account has an admin privilege, you can add to the list of questions. 
                Contact your admin to upgrade access level.
            </p>
        </div>
    )
}

export default Home
