const route = require('express').Router()
const userController=require('../controller/userController')
const userRouteUtil= require('../util/userRouteUtil')

const cookieParser=require('cookie-parser')

route.use(cookieParser())

route.post('/signup', userController.checkUser, userController.createUser)

route.post('/signin', userController.signInUser, userRouteUtil.assignCookies)

route.post('/signout', userRouteUtil.deleteCookies)

module.exports= route