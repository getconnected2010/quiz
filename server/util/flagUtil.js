const db = require("../config/db")

exports.FlagUser=(username)=>{
    const flagUserSql="INSERT INTO flagged (username) VALUES (?)"
    db.query(flagUserSql, [username], (err)=>{
        if(err){
            console.log(err)
        }
    })
}

exports.FlaggedUserReset = (username)=>{
    const flaggedUserResetSql="DELETE FROM flagged WHERE username=?"
    db.query(flaggedUserResetSql, [username], (err)=>{
        if(err){
            console.log(err)
           }
    })
}