const route = require('express').Router()
const userController=require('../controller/userController')
const userRouteUtil= require('../util/userRouteUtil')

const cookieParser=require('cookie-parser')

route.use(cookieParser())

route.post('/signup', userController.checkUser, userController.createUser)

route.post('/login', userController.loginUser, userRouteUtil.assignCookies)

module.exports= route