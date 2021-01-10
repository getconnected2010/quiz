const route = require('express').Router()
const userController=require('../controller/userController')
const cookies= require('../util/cookies')
const verify = require('../util/verify')

const cookieParser=require('cookie-parser')

route.use(cookieParser())

route.post('/admin/delete', cookies.verifyAdmin, cookies.refresh, verify.adminDB, verify.password, userController.deleteUser)

route.post('/admin/unflag', cookies.verifyAdmin, cookies.refresh, verify.adminDB, verify.password, userController.userAdminReset)

route.post('/self/reset', verify.userNotTimeout, verify.usernameDobMatchDb, userController.userSelfReset)

route.post('/signin', verify.userNotFlagged, userController.userSignIn, verify.password, cookies.assign)

route.post('/signout', cookies.delete)

route.post('/signup', verify.usernameAvailable, userController.userSignUp)

route.post('/update/password', cookies.verifyLoggedUser, cookies.refresh, verify.userInDB, verify.userNotFlagged, verify.password, userController.updatePassword)

route.post('/update/username', cookies.verifyLoggedUser, cookies.refresh, verify.userInDB, verify.userNotFlagged, verify.password, verify.newUsernameAvailable, userController.updateUsername)

module.exports= route