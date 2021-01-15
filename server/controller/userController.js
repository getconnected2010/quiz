const db= require('../config/db')
const bcrypt= require('bcrypt')
const flagUtil = require('../util/flagUtil')
const scoreUtil = require('../util/scoreUtil')

exports.delUser=async(req, res)=>{
    const {username}= req.body
    const delSql= "DELETE FROM users WHERE username=?"
    db.query(delSql, [username], (err)=>{
        if(err) return res.status(500).json({msg:'server error deleting username'})
        flagUtil.flaggedUserReset(username)
        scoreUtil.delNullScore()
        res.status(200).json({msg:'username successfully deleted'})
    })
}

exports.dnGradeUser=(req, res)=>{
    const {username} = req.body
    const dnGradeSql = "UPDATE users SET admin= 'false' WHERE username=?"
    db.query(dnGradeSql, [username], (err)=>{
        if(err) return res.status(500).json({msg:'error down-grading username to admin'})
        res.status(200).json({msg:'if username exits in database, it has been down-graded from admin'})
    })
}

exports.getUserId=(req, res, next)=>{
    const username = req.params.username
    const getUserIdSql="SELECT user_id FROM users WHERE username=?"
    db.query(getUserIdSql, [username], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error fetching scores'})
        if(result.length===0) return res.status(401).json({msg:"that username doesn't exist in database"})
        if(result.length===1){
            req.body.user_id= result[0].user_id
            next()
        }else{
            res.status(400).json({msg:'server error fetching scores'})
        }
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

 exports.upgradeUser=(req, res)=>{
     const {username} = req.body
     const upgradeSql = "UPDATE users SET admin= 'true' WHERE username=?"
     db.query(upgradeSql, [username], (err)=>{
         if(err) return res.status(500).json({msg:'error up-grading username to admin'})
         res.status(200).json({msg:'if username exits in database, it has been up-graded to admin'})
     })
 }
exports.userAdminReset=async (req, res)=>{
    try {
        const {username}= req.body
        await flagUtil.flaggedUserReset(username)
        res.status(200).json({msg:'success resetting username'})
    } catch (error) {
        res.status(500).json({msg:'server error resetting username'})
    }
}

exports.userSelfReset=async(req, res)=>{
    try {
        const{password, username} = req.body
        const salt= Number(process.env.SALT)
        const hashedPass= await bcrypt.hash(password, salt)
        const resetSql="UPDATE users SET password=? WHERE username=?"
        db.query(resetSql, [hashedPass, username], (err)=>{
            if(err) return res.status(500).json({msg:'server error resetting password'})
            flagUtil.flaggedUserReset(username)
            res.status(200).json({msg:'your password is reset. Continue to Login page.'})
        })
    } catch (error) {
        res.status(500).json({msg:"server error resetting password"})
    } 
}

exports.userSignIn= (req, res, next)=>{
    const {username} = req.body
    const userSql= "SELECT * FROM users WHERE username=?"
    db.query(userSql, [username], (err, result)=>{
        if(err) return res.status(500).json({msg:'server error. If error persists, contact site admin.'})
        if(result.length===0) return res.status(404).json({msg:'not a registered username'})
        if(result.length>1){
            flagUtil.flagUser(username)
            res.status(400).json({msg:'illegal attempt'})
        }
        else if(result.length===1){
            req.body.dbPassword= result[0].password
            req.body.user_id= result[0].user_id
            req.body.admin= result[0].admin
            next()
        } else{
            flagUtil.flagUser(username)
            res.status(401).json({msg:'wrong password'})
        }
    })
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

