const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser= require('body-parser')
const quizRoutes= require('./routes/quizRoutes')
const userRoutes = require('./routes/userRoutes')
const cookieParser= require('cookie-parser')


app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

//quiz route
app.use('/quiz', quizRoutes)
//user route
app.use('/user', userRoutes)

app.get('/', (req, res)=>{
    res.send('Hello')
})

const PORT= 8000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})