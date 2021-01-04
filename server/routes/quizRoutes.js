const express = require('express')
const router = express.Router()
const db= require('../config/db')
const quizController= require('../controller/quizController')
const {validateInputs, inputValidatoinResult} = require('../util/addRouteValidator')
const cookies= require('../util/cookies')
const verifyAdmin = require('../util/verifyAdmin')


router.post('/add', cookies.verifyAdminCookies, verifyAdmin, validateInputs, inputValidatoinResult, quizController.AddQa)

router.delete('/delete/:id/:user_id', cookies.verifyAdminCookies, verifyAdmin, quizController.deleteQa)

router.get('/list', quizController.GetQa)

module.exports= router