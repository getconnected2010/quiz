const route = require('express').Router()
const userController=require('../controller/userController')
const cookies= require('../util/cookies')
const verify = require('../util/verify')

const cookieParser=require('cookie-parser')

route.use(cookieParser())

route.post('/reset',userController.checkUserOnTimeout, userController.checkUsernameDobMatchDb, userController.userReset)

route.post('/signin', userController.flaggedUserCheck, userController.userSignIn, verify.verifyPasswords, cookies.assignCookies)

route.post('/signout', cookies.deleteCookies)

route.post('/signup', userController.checkUserExistsDb, userController.userSignUp)

route.post('/update/password', cookies.verifyLoggedUserCookies, verify.verifyUser, userController.flaggedUserCheck, verify.verifyPasswords, userController.updatePassword)

route.post('/update/username', cookies.verifyLoggedUserCookies, verify.verifyUser, userController.flaggedUserCheck, verify.verifyPasswords, userController.checkNewUsernameAvailable, userController.updateUsername)

module.exports= route