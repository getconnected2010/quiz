const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser= require('body-parser')
const quizRoutes= require('./routes/quizRoutes')

app.use(cors())
app.use(bodyParser.json())

app.use('/quiz', quizRoutes)

app.get('/', (req, res)=>{
    res.send('Hello')
})

const PORT= 8000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})