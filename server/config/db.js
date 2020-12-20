require('dotenv').config()
const mysql= require('mysql')


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE

})

db.connect((err)=>{
    if(err) throw err;
    console.log('connected to db')
})
module.exports= db