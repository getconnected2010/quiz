const db = require("../config/db")

const FlagUser=(username)=>{
    const flagUserSql="INSERT INTO flagged (username) VALUES (?)"
    db.query(flagUserSql, [username], (err)=>{
        if(err){
            console.log(err)
        }
    })
}
module.exports = FlagUser