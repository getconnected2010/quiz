const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser= require('body-parser')

app.use(cors())
app.use(bodyParser())

app.get('/', (req, res)=>{
    res.send('Hello')
})

const PORT= 8000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})