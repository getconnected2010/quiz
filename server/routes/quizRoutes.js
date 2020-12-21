const express = require('express')
const router = express.Router()
const db= require('../config/db')
const quizController= require('../controller/quizController')
const {validateInputs, inputValidatoinResult} = require('../utility/addRouteValidator')

router.get('/list', quizController.GetQa)

router.post('/add', validateInputs, inputValidatoinResult, quizController.AddQa)

router.delete('/delete/:id', quizController.deleteQa)

module.exports= router