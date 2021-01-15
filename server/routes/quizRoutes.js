const express = require('express')
const router = express.Router()
const db= require('../config/db')
const QC= require('../controller/quizController')
const VAL = require('../util/validator')
const CK= require('../util/cookies')
const VER = require('../util/verify')


router.post('/add', CK.verifyAdmin, CK.refresh, VER.adminDB, VAL.addQA, VAL.validatorResult, QC.addQa)

router.delete('/delete/:id/:user_id', CK.verifyAdmin, CK.refresh, VER.adminDB, QC.deleteQa)

router.get('/list/:subject', QC.getQa)

router.get('/scores/:user_id', CK.verifyLoggedUser, CK.refresh, VER.userInDB, QC.fetchScores)

router.post('/score', CK.verifyLoggedUser, CK.refresh, VER.userInDB, VAL.recordScore, VAL.validatorResult, QC.recordScore)

module.exports= router