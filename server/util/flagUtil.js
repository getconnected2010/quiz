const db = require("../config/db")

exports.flagUser= (username)=>{
    const flagUserSql="INSERT INTO flagged (username) VALUES (?)"
    db.query(flagUserSql, [username], (err)=>{
        if(err){
            console.log(err)
        }
    })
}

exports.flaggedUserReset = async(username)=>{
    const flaggedUserResetSql="DELETE FROM flagged WHERE username=?"
    db.query(flaggedUserResetSql, [username], (err)=>{
        if(err){
            console.log(err)
           }
    })
}