const db = require("../config/db")

const FlaggedUserReset = (username)=>{
    const flaggedUserResetSql="DELETE FROM flagged WHERE username=?"
    db.query(flaggedUserResetSql, [username], (err)=>{
        if(err){
            console.log(err)
           }
    })
}
module.exports= FlaggedUserReset