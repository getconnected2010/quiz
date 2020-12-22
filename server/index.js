const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser= require('body-parser')
const quizRoutes= require('./routes/quizRoutes')
const adminRoutes = require('./routes/adminRoutes')

app.use(cors())
app.use(bodyParser.json())
//quiz route
app.use('/quiz', quizRoutes)
//admin route
app.use('/admin', adminRoutes)

app.get('/', (req, res)=>{
    res.send('Hello')
})

const PORT= 8000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})