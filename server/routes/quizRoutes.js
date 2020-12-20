const express = require('express')
const router = express.Router()
const db= require('../config/db')
const quizController= require('../controller/quizController')
const {qaBodyCheck, qaCheckResult} = require('../utility/addValidator')

router.get('/list', quizController.GetQa)

router.post('/add', qaBodyCheck, qaCheckResult, quizController.AddQa)

module.exports= router