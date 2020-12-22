const db= require('../config/db')
const bcrypt= require('bcrypt')
require('dotenv').config()

exports.createAdmin=async(req, res)=>{
    const {username, password} =req.body
    const salt= process.env.SALT
    try {
        const hashedPass =await bcrypt.hash(password, salt)
        const adminSql= "INSERT INTO admin (username, password) VALUES (?,?)"
        db.query(adminSql, [username, hashedPass], (err, result)=>{
            if(err){
                return res.status(400).json(err.code)
            }else{
                return res.status(200).json(result)
            }
        })
    } catch (error) {
        res.status(400).json({bcryptError: error})
    }
}

exports.loginAdmin= async(req, res)=>{
    const {username, password} = req.body
    const adminSql= "SELECT * FROM admin WHERE username=?"
    db.query(adminSql, [username], (err, result)=>{
        if(err){
            res.status(400).json(err)
        }else if(result.length===0){return res.status(400).json({msg:'not a registered username'})}
        else if(result.length>1){return res.status(400).json({msg:'illegal attempt'})}
        else if(result.length===1){
            const dbPassword= result[0].password
            const check = bcrypt.compare(password, dbPassword, (err, same)=>{
                if(err){
                    return res.status(400).json({msg:'bcrypt fail'})
                }else{
                    console.log(same)
                }
            })
        }
    })
}