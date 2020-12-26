const route = require('express').Router()
const userController=require('../controller/userController')
const cookies= require('../util/cookies')

const cookieParser=require('cookie-parser')

route.use(cookieParser())

route.post('/signup', userController.checkUser, userController.createUser)

route.post('/signin', userController.signInUser, cookies.assignCookies)

route.post('/signout', cookies.deleteCookies)

module.exports= route