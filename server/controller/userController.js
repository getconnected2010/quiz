const db= require('../config/db')
const bcrypt= require('bcrypt')

exports.createUser=async(req, res)=>{
    try {
        const {username, password, dob} =req.body
        const salt= Number(process.env.SALT)
        const hashedPass =await bcrypt.hash(password, salt)
        const userSql= "INSERT INTO users (username, password, dob) VALUES (?,?,?)"
        db.query(userSql, [username, hashedPass, dob], (err, result)=>{
            if(err){
                return res.status(400).json(err)
            }else{
                return res.status(200).json({msg:'user created. Continue to Login page'})
            }
        })
    } catch (error) {
        res.status(400).json({msg:'custom server error message'})
    }
}

exports.signInUser= async(req, res, next)=>{
    const {username, password} = req.body
    const userSql= "SELECT * FROM users WHERE username=?"
    db.query(userSql, [username], (err, result)=>{
        if(err){
            res.status(500).json({msg:'server error. If error persists, contact site admin.'})
        }else if(result.length===0){return res.status(404).json({msg:'not a registered username'})}
        else if(result.length>1){return res.status(400).json({msg:'illegal attempt'})}
        else if(result.length===1){
            const dbPassword= result[0].password
            bcrypt.compare(password, dbPassword, (err, same)=>{
                if(err){
                    return res.status(500).json({msg:'error processing password request.'})
                }else if(same===true){
                    req.body.user_id= result[0].user_id
                    req.body.admin= result[0].admin
                    next()
                }else { 
                    res.status(401).json({msg:'wrong password'})
                }
            })
        }
    })   
}

exports.checkUser=(req, res, next)=>{
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
            res.status(422).json({msg:'That user account already exists. Please try to login or reset password.'})
        }
    })
}