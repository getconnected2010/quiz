const db = require("../config/db")

exports.verifyAdmin=(req, res, next)=>{
    const user_id= req.params.user_id || req.body.user_id
    const sqlAdmin= "SELECT admin FROM users WHERE user_id=?"
    db.query(sqlAdmin, [user_id], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error'})
        } else if(result.length===1 && result[0].admin==='true'){
           next()
        } else{
            res.status(401).json({msg:'you dont have admin priviledge'})
        }
    })
}

exports.verifyUser=(req, res, next)=>{
    const user_id= req.params.user_id || req.body.user_id
    const sqlUser= "SELECT username FROM users WHERE user_id=?"
    db.query(sqlUser, [user_id], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error'})
        } else if(result.length===1){
            req.body.username = result[0].username
            next()
        } else{
            res.status(401).json({msg:'Score not recorded in database. Invalid user. Ensure you are logged in. If error persists, contact admin.'})
        }
    })
}
