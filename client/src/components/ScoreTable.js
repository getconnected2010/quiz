import React from 'react'

const ScoreTable = ({array, onClick}) => {
    return (
        <table>
            <tbody >
            {
                array.map(score=>(
                        <tr key={score.subject}>
                            <td>{score.subject}</td>
                            <td>{score.score}</td>
                        </tr>
                ))
            }
            </tbody>
            { 
                onClick && <button onClick={onClick}>Clear scores</button>
            }
        </table>
    )
}

export default ScoreTable
