const express = require('express')
const router = express.Router()
const db= require('../config/db')
const quizController= require('../controller/quizController')
const {validateInputs, inputValidatoinResult} = require('../util/addRouteValidator')
const cookies= require('../util/cookies')
const verify = require('../util/verify')


router.post('/add', cookies.verifyAdmin, cookies.refresh, verify.adminDB, validateInputs, inputValidatoinResult, quizController.addQa)

router.delete('/delete/:id/:user_id', cookies.verifyAdmin, cookies.refresh, verify.adminDB, quizController.deleteQa)

router.get('/list/:subject', quizController.getQa)

router.get('/scores/:user_id', cookies.verifyLoggedUser, cookies.refresh, verify.userInDB, quizController.fetchScores)

router.post('/score', cookies.verifyLoggedUser, cookies.refresh, verify.userInDB, quizController.recordScore)

module.exports= router