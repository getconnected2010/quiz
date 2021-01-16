import React from 'react'

const ScoreTable = ({array, onClick}) => {
    return (
        <div>
            <table>
                <tbody>
                    <>
                        {
                            array.map(score=>(
                                    <tr key={score.subject}>
                                        <td>{score.subject}</td>
                                        <td>{score.score}</td>
                                    </tr>
                            ))
                        }
                        <tr>
                            <td>
                                <button onClick={onClick}>Clear scores</button>
                            </td>
                        </tr>
                    </>
                </tbody>
                
            </table>
            
        </div>
    )
}

export default ScoreTable
