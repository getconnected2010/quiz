const db = require("../config/db")
const bcrypt = require('bcrypt')
const flagUtil = require('../util/flagUtil')

exports.adminDB=(req, res, next)=>{
    const user_id= req.params.user_id || req.body.user_id
    const sqlAdmin= "SELECT admin FROM users WHERE user_id=?"
    db.query(sqlAdmin, [user_id], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error'})
        if(result.length===1 && result[0].admin==='true') return next()
        res.status(401).json({msg:'you dont have admin priviledge'})
    })
}

exports.newUsernameAvailable=(req, res, next)=>{
    const {newUsername} = req.body
    const userChecksql="SELECT COUNT(*) AS user FROM users WHERE username=?"
    db.query(userChecksql,[newUsername], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error verifying new username'})
        if(result[0].user===0) return next()
        res.status(401).json({msg:'username not available'})
    })
}

exports.password=(req, res, next)=>{
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

exports.userInDB=(req, res, next)=>{
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

exports.usernameAvailable=(req, res, next)=>{
    const {username} = req.body
    const userCheckSql= "SELECT username FROM users WHERE username=?"
    db.query(userCheckSql, [username], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error checking username'})
        if(result && result.length===0) return next()
        res.status(422).json({msg:'That user account already exists.'})
    })
}

exports.usernameDobMatchDb=(req, res, next)=>{
    const{username, dob} = req.body
    userDobSql="SELECT username, dob FROM users WHERE username=? AND dob=?"
    db.query(userDobSql, [username, dob], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error matching username and DOB'})
        } else if(result.length===0){
            flagUtil.FlagUser(username)
            res.status(401).json({msg:"username and date of birth don't match record"})
        } else if(result.length>1){
            flagUtil.FlagUser(username)
            res.status(400).json({msg:"illegal attempt"})
        } else if(result.length===1){
            next()
        }
    })
}

exports.userNotFlagged = (req, res, next)=>{
    const{username} = req.body
    flagCheckSql= "SELECT COUNT(*) AS flaggedCount FROM flagged WHERE username=?"
    db.query(flagCheckSql, [username], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error checking username against blacklist'})
        if(result[0].flaggedCount<3) return next()
        res.status(401).json({msg:'your account is blocked. Please reset your password'})
    })
 }


exports.userNotTimeout = (req, res, next)=>{
    const {username} = req.body
    timeoutSql= "SELECT COUNT(*) AS flaggedCount FROM flagged WHERE username=? AND unix_timestamp(time)> unix_timestamp(now())-1800"
    db.query(timeoutSql, [username], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error. Try again later or notify admin'})
        if(result[0].flaggedCount>3) return res.status(401).json({msg:'Too many failed reset attempts. Your account is locked for 30 minutes.'})
        next()
    })
}