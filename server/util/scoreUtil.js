const db = require("../config/db")

exports.recordScore=(req, res)=>{
    const {user_id, subject, score} = req.body
    recordScoreSql="INSERT INTO score (user_id, subject, score) values(?,?,?)"
    db.query(recordScoreSql, [user_id, subject, score], (err)=>{
        if(err) return res.status(500).json({msg:'server error recording your score'})
        res.status(200).json({msg:'score successfully recorded in database'})
    })
}

exports.updateScore=(req, res)=>{
    const {user_id, subject, score} = req.body
    updateScoreSql= "UPDATE score SET score=? WHERE user_id=? AND subject=?"
    db.query(updateScoreSql, [score, user_id, subject], (err)=>{
        if(err) return res.status(500).json({msg:'server error updating your score.'})
        res.status(200).json({msg:'score sussfully recorded in database'})
    })
}