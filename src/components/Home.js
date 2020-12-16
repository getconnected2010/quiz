import React from 'react'
import './home.css';

const Home = () => {
    return (
        <div className='HomePage'>
            <h1>Welcome to your quiz app</h1>
            <p>
                Have you wanted to quiz someone else based on your knowledge? 
                Well, this is exactly what this app will do.
                Click on the 'Add to Quiz' tab and enter a question with four options for an answer.
                Hint...one of the four questions should be the correct answer.
                Enter as many questions and answers you like.
                Then select 'Take Quiz' tab where you will find a list of all the questions and answer options.
                Select an answer for each question and click 'Submit'. Your answers will be verified and a score will
                display on the screen.
                Happy playing...
            </p>
        </div>
    )
}

export default Home
