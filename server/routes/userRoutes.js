const route = require('express').Router()
const CK = require('../util/cookies')
const QC = require('../controller/quizController')
const UC = require('../controller/userController')
const VAL = require('../util/inputValidator')
const VER = require('../util/verify')

const cookieParser = require('cookie-parser')

route.use(cookieParser())

route.get('/admin/scores/:user_id/:userScore', CK.verifyAdmin, CK.refresh, VER.adminDB, UC.getUserId, QC.fetchScores)

route.post('/admin/delete', CK.verifyAdmin, CK.refresh, VER.adminDB, VER.password, VAL.delUser, VAL.validatorResult, UC.delUser)

route.post('/admin/dngrade', CK.verifyAdmin, CK.refresh, VER.adminDB, VER.password, VAL.dnGradeUser, VAL.validatorResult, UC.dnGradeUser)

route.post('/admin/upgrade', CK.verifyAdmin, CK.refresh, VER.adminDB, VER.password, VAL.upgradeUser, VAL.validatorResult, UC.upgradeUser)

route.post('/admin/reset', CK.verifyAdmin, CK.refresh, VER.adminDB, VER.password, VAL.userAdminReset, VAL.validatorResult, UC.userAdminReset)

route.post('/self/reset', VER.userNotTimeout, VER.usernameDobMatchDb,VAL.userSelfReset, VAL.validatorResult, UC.userSelfReset)

route.post('/signin', VER.userNotFlagged, UC.userSignIn, VER.password, CK.assign)

route.get('/signout', CK.delete)

route.post('/signup', VER.usernameAvailable, UC.userSignUp)

route.post('/update/password', CK.verifyLoggedUser, CK.refresh, VER.userInDB, VER.userNotFlagged, VER.password, UC.updatePassword)

route.post('/update/username', CK.verifyLoggedUser, CK.refresh, VER.userInDB, VER.userNotFlagged, VER.password, VER.newUsernameAvailable, UC.updateUsername)

module.exports = route