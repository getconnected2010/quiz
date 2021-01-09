const db= require('../config/db')
const bcrypt= require('bcrypt')
const flagUtil = require('../util/flagUtil')

exports.checkNewUsernameAvailable=(req, res, next)=>{
    const {newUsername} = req.body
    const userChecksql="SELECT COUNT(*) AS user FROM users WHERE username=?"
    db.query(userChecksql,[newUsername], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error verifying new username'})
        if(result[0].user===0) return next()
        res.status(401).json({msg:'username not available'})
    })
}

exports.checkUserExistsDb=(req, res, next)=>{
    const {username} = req.body
    const userCheckSql= "SELECT username FROM users WHERE username=?"
    db.query(userCheckSql, [username], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error checking username'})
        if(result && result.length===0) return next()
        res.status(422).json({msg:'That user account already exists.'})
    })
}

exports.checkUsernameDobMatchDb=(req, res, next)=>{
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

exports.checkUserOnTimeout=(req, res, next)=>{
    const {username} = req.body
    timeoutSql= "SELECT COUNT(*) AS flaggedCount FROM flagged WHERE username=? AND unix_timestamp(time)> unix_timestamp(now())-1800"
    db.query(timeoutSql, [username], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error. Try again later or notify admin'})
        if(result[0].flaggedCount>3) return res.status(401).json({msg:'Too many failed reset attempts. Your account is locked for 30 minutes.'})
        next()
    })
}

exports.flaggedUserCheck= (req, res, next)=>{
    const{username} = req.body
    flagCheckSql= "SELECT COUNT(*) AS flaggedCount FROM flagged WHERE username=?"
    db.query(flagCheckSql, [username], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error checking username against blacklist'})
        if(result[0].flaggedCount<3) return next()
        res.status(401).json({msg:'your account is blocked. Please reset your password'})
    })
 }

 exports.updatePassword=(req, res)=>{
     const {username, newPassword} = req.body
     const salt = Number(process.env.SALT)
     bcrypt.hash(newPassword, salt, (err, hash)=>{
         if(err) return res.status(500).json({msg:'server error processing password'})
         const updatePassSql="UPDATE users SET password=? WHERE username=?"
         db.query(updatePassSql, [hash, username], (err)=>{
             if(err) return res.status(500).json({msg:'server error processing password'})
             res.status(200).json({msg:'Successfully updated password'})
         })
     })
 }

 exports.updateUsername=(req, res)=>{
    const {username, newUsername} = req.body
    const updateSql="UPDATE users SET username=? WHERE username=?"
    db.query(updateSql,[newUsername, username], (err)=>{
        if(err) return res.status(500).json({msg:'server error updating username'})
        res.status(200).json({msg:'username successfully updated'})
    })
 }

exports.userReset=async(req, res)=>{
    try {
        const{username, password} = req.body
        const salt= Number(process.env.SALT)
        const hashedPass= await bcrypt.hash(password, salt)
        const resetSql="UPDATE users SET password=? WHERE username=?"
        db.query(resetSql, [hashedPass, username], (err)=>{
            if(err) return res.status(500).json({msg:'server error resetting password'})
            flagUtil.FlaggedUserReset(username)
            res.status(200).json({msg:'your password is reset. Continue to Login page.'})
        })
    } catch (error) {
        res.status(500).json({msg:"server error resetting password"})
    } 
}

exports.userSignUp=async(req, res)=>{
    try {
        const {username, password, dob} =req.body
        const salt= Number(process.env.SALT)
        const hashedPass =await bcrypt.hash(password, salt)
        const userSql= "INSERT INTO users (username, password, dob) VALUES (?,?,?)"
        db.query(userSql, [username, hashedPass, dob], (err, result)=>{
            if(err) return res.status(400).json({msg:'database error with sign up'})
            res.status(200).json({msg:'user created. Continue to Login page'})
        })
    } catch (error) {
        res.status(500).json({msg:'server error with sign up'})
    }
}

exports.userSignIn= (req, res, next)=>{
    const {username, password} = req.body
    const userSql= "SELECT * FROM users WHERE username=?"
    db.query(userSql, [username], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error. If error persists, contact site admin.'})
        if(result.length===0) return res.status(404).json({msg:'not a registered username'})
        if(result.length>1){
            flagUtil.FlagUser(username)
            res.status(400).json({msg:'illegal attempt'})
        }
        else if(result.length===1){
            req.body.dbPassword= result[0].password
            req.body.user_id= result[0].user_id
            req.body.admin= result[0].admin
            next()
        } else{
            flagUtil.FlagUser(username)
            res.status(401).json({msg:'wrong password'})
        }
    })
}

