const db= require('../config/db')
const scoreUtil = require('../util/scoreUtil')

exports.addQa = (req, res)=>{
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
        if(err) return res.status(400).json(({msg:'server error deleting.'}))
        res.status(200).json({msg: 'successfully deleted'})
    })
}

exports.fetchScores=(req, res)=>{
    const user_id= req.params.user_id || req.body.user_id
    const scoresSql= "SELECT subject, score FROM score WHERE user_id=? ORDER BY subject ASC"
    db.query(scoresSql, [user_id], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error retrieving your scores'})
        res.status(200).json({result})
    })
}

exports.getQa = (req, res)=>{
    const { refreshToken} = req.cookies
    const subject = req.params.subject
    const listSql= "SELECT * FROM quiz_list WHERE subject=? ORDER BY id DESC";
    db.query(listSql,[subject], (err, results)=>{
        if(err) return res.status(400).json(err)
        res.status(200).json(results)
    })
}

exports.recordScore=(req, res)=>{
    const {user_id, subject} = req.body
    const scoreSql= "SELECT COUNT(*) as user FROM score WHERE user_id=? AND subject=?"
    db.query(scoreSql, [user_id, subject], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error recording your score'})
        if(result[0].user===1) return scoreUtil.updateScore(req, res)
        if(result[0].user===0) return scoreUtil.recordScore(req, res)
        res.status(401).json({msg:"invalid user detected. Your score can't be recorded."})
    })
}