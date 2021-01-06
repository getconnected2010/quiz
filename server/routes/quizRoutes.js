const express = require('express')
const router = express.Router()
const db= require('../config/db')
const quizController= require('../controller/quizController')
const {validateInputs, inputValidatoinResult} = require('../util/addRouteValidator')
const cookies= require('../util/cookies')
const verify = require('../util/verify')


router.post('/add', cookies.verifyAdminCookies, verify.verifyAdmin, validateInputs, inputValidatoinResult, quizController.AddQa)

router.delete('/delete/:id/:user_id', cookies.verifyAdminCookies, verify.verifyAdmin, quizController.deleteQa)

router.get('/list/:subject', quizController.GetQa)

router.post('/score', cookies.verifyLoggedUserCookies, verify.verifyUser, quizController.recordScore)

module.exports= router