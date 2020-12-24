require('dotenv').config()
const mysql= require('mysql')


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE

})

db.connect((err)=>{
    if(err){
        return console.log('failed to connect to db', err)
    } else{
        console.log('connected to db')
    }
})
// db.end((err)=>{
//     if(err) console.log('db end error', err)
// })
module.exports= db