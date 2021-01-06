const db= require('../config/db')
const bcrypt= require('bcrypt')
const flagUtil = require('../util/flagUtil')

exports.checkUserExistsDb=(req, res, next)=>{
    const {username} = req.body
    const userCheckSql= "SELECT username FROM users WHERE username=?"
    db.query(userCheckSql, [username], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error'})
        }
        if(result && result.length===0){
            next()
        }
        else{
            res.status(422).json({msg:'That user account already exists.'})
        }
    })
}

exports.checkUsernameDobMatchDb=(req, res, next)=>{
    const{username, dob} = req.body
    userDobSql="SELECT username, dob FROM users WHERE username=? AND dob=?"
    db.query(userDobSql, [username, dob], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error resetting password'})
        } else if(result.length===0){
            flagUtil.FlagUser(username)
            res.status(401).json({msg:"username and date of birth don't match our record"})
        } else if(result.length>1){
            flagUtil.FlagUser(username)
            res.status(400).json({msg:"illegal attempt"})
        } else if(result.length===1){
            next()
        }
    })
}

exports.checkUserTimeout=(req, res, next)=>{
    const {username} = req.body
    timeoutSql= "SELECT COUNT(*) AS flaggedCount FROM flagged WHERE username=? AND unix_timestamp(time)> unix_timestamp(now())-1800"
    db.query(timeoutSql, [username], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error. Try again later or notify admin'})
        }
        if(result[0].flaggedCount>3){
            res.status(401).json({msg:'Too many failed reset attempts. Your account is locked for 30 minutes.'})
        } else{
            next()
        }  
    })
}

exports.flaggedUserCheck= (req, res, next)=>{
    const{username} = req.body
    flagCheckSql= "SELECT COUNT(*) AS flaggedCount FROM flagged WHERE username=?"
    db.query(flagCheckSql, [username], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error checking your IP'})
        }else if(result[0].flaggedCount<2){
            next()
        }else{
            res.status(401).json({msg:'your account is locked. Please reset your password'})
        }
    })
 }

exports.userReset=async(req, res)=>{
    try {
        const{username, password} = req.body
        const salt= Number(process.env.SALT)
        const hashedPass= await bcrypt.hash(password, salt)
        const resetSql="UPDATE users SET password=? WHERE username=?"
        db.query(resetSql, [hashedPass, username], (err, result)=>{
            if(err){
                res.status(500).json({msg:'server error resetting password'})
            }else{
                flagUtil.FlaggedUserReset(username)
                res.status(200).json({msg:'your password is reset. Continue to Login page.'})
            }
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
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json({msg:'user created. Continue to Login page'})
            }
        })
    } catch (error) {
        res.status(500).json({msg:'custom server error message'})
    }
}

exports.userSignIn= async(req, res, next)=>{
    const {username, password} = req.body
    const userSql= "SELECT * FROM users WHERE username=?"
    db.query(userSql, [username], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error. If error persists, contact site admin.'})
        }else if(result.length===0){ res.status(404).json({msg:'not a registered username'})}
        else if(result.length>1){
            flagUtil.FlagUser(username)
            res.status(400).json({msg:'illegal attempt'})
        }
        else if(result.length===1){
            const dbPassword= result[0].password
            bcrypt.compare(password, dbPassword, (err, same)=>{
                if(err){
                    res.status(500).json({msg:'error processing password request.'})
                }else if(same===true){
                    req.body.user_id= result[0].user_id
                    req.body.admin= result[0].admin
                    next()
                }else { 
                    flagUtil.FlagUser(username)
                    res.status(401).json({msg:'wrong password'})
                }
            })
        }
    })   
}

