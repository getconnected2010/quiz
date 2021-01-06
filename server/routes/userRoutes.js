const route = require('express').Router()
const userController=require('../controller/userController')
const cookies= require('../util/cookies')

const cookieParser=require('cookie-parser')

route.use(cookieParser())

route.post('/reset',userController.checkUserTimeout, userController.checkUsernameDobMatchDb, userController.userReset)

route.post('/signin', userController.flaggedUserCheck, userController.userSignIn, cookies.assignCookies)

route.post('/signout', cookies.deleteCookies)

route.post('/signup', userController.checkUserExistsDb, userController.userSignUp)

module.exports= route