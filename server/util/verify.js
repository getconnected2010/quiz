const db = require("../config/db")
const bcrypt = require('bcrypt')
const flagUtil = require('../util/flagUtil')

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
    const sqlUser= "SELECT username, password FROM users WHERE user_id=?"
    db.query(sqlUser, [user_id], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error'})
        } else if(result.length===1){
            req.body.username = result[0].username
            req.body.dbPassword = result[0].password
            next()
        } else{
            res.status(401).json({msg:"Your user profile couldn't be verified in the database"})
        }
    })
}

exports.verifyPasswords=(req, res, next)=>{
    const {username, password, dbPassword} = req.body
    bcrypt.compare(password, dbPassword, (err, same)=>{
        if(err) return res.status(500).json({msg:'server error verifying your password'})
        if(same) {
            flagUtil.FlaggedUserReset(username)
            next()
        } else{
            flagUtil.FlagUser(username)
            res.status(401).json({msg:'wrong password'})
        }
    })
}