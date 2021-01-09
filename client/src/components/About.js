import React from 'react'
import './css/about.css'

const About = () => {
    return (
        <div className='About'>
             <p>
                Hello guest...
                <br/>
                This is a quiz app with various subject area questions and multiple choice answers. 
                You can choose a subject area in the Home page which will populate questions with multiple choice answers.
                Choose the correct answer for each question and click submit.
                Once you answer all the questions for a subject area, your score is automatically calculated and displayed. 
            <br/><br/>
                You can practice with these questions as a guest or as a registered user. 
                Note that as a registered user, you will be able to save your scores in our database.
                These saved scores will enable you to track your progress in the future.
            <br/><br/>
                If your account has an admin privilege, you can add to the list of questions. 
                Contact your admin to upgrade access level.
            <br/><br/>
                Good luck and have fun...
            </p>
        </div>
    )
}

export default About
