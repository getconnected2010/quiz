const db = require("../config/db")

const verifyAdmin=(req, res, next)=>{
    const user_id= req.params.user_id || req.body.user_id
    const sqlUser= "SELECT admin FROM users WHERE user_id=?"
    db.query(sqlUser, [user_id], (err, result)=>{
        if(err){
            res.status(401).json({msg:'server error'})
        } else if(result.length===1 && result[0].admin==='true'){
           next()
        } else{
            res.status(401).json({msg:'you dont have admin priviledge'})
        }
    })
}
module.exports= verifyAdmin