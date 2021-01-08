const db= require('../config/db')
const scoreUtil = require('../util/scoreUtil')

exports.AddQa = (req, res)=>{
    const {subject, question, answer1, answer2, answer3, answer4, correct} = req.body
    const sqlAdd = "INSERT INTO quiz_list (subject, question, answer1, answer2, answer3, answer4, correct) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlAdd, [subject, question, answer1, answer2, answer3, answer4, correct], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error'})
        res.status(200).send(result)
    })
}

exports.deleteQa=(req, res)=>{
    const id= req.params.id
    const deleteSql= "DELETE FROM quiz_list WHERE id=?"
    db.query(deleteSql, [id], (err, result)=>{
        if(err) return res.status(400).json(err)
        res.status(200).json({msg: 'successfully deleted'})
    })
}

exports.fetchScores=(req, res)=>{
    const username= req.body.username
    const scoresSql= "SELECT subject, score FROM score WHERE username=?"
    db.query(scoresSql, [username], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error'})
        }else{
            res.status(200).json({result})
        }
    })
}

exports.GetQa = (req, res)=>{
    const subject = req.params.subject
    const listSql= "SELECT * FROM quiz_list WHERE subject=? ORDER BY id DESC";
    db.query(listSql,[subject], (err, results)=>{
        if(err) return res.status(400).json(err)
        res.status(200).json(results)
    })
}

exports.recordScore=(req, res)=>{
    const {username, subject} = req.body
    const scoreSql= "SELECT COUNT(*) as user FROM score WHERE username=? AND subject=?"
    db.query(scoreSql, [username, subject], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error recording your score'})
        } else if(result[0].user===1){
            scoreUtil.updateScore(req, res)
        } else if(result[0].user===0){
            scoreUtil.recordScore(req, res)
        } else{
            res.status(401).json({msg:"invalid user detected. Your score can't be recorded."})
        }
    })
}