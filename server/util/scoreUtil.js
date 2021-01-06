const db = require("../config/db")

exports.recordScore=(req, res)=>{
    const {username, subject, score} = req.body
    recordScoreSql="INSERT INTO score (username, subject, score) values(?,?,?)"
    db.query(recordScoreSql, [username, subject, score], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error recording your score'})
        }else{
            res.status(200).json({msg:'score successfully recorded in database'})
        }
    })
}

exports.updateScore=(req, res)=>{
    const {username, subject, score} = req.body
    updateScoreSql= "UPDATE score SET score=? WHERE username=? AND subject=?"
    db.query(updateScoreSql, [score, username, subject], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error updating your score.'})
        }else{
            res.status(200).json({msg:'score sussfully recorded in database'})
        }
    })
}