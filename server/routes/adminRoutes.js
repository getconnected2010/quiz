const route = require('express').Router()
const adminController=require('../controller/adminController')

route.post('/create', adminController.createAdmin)

route.post('/login', adminController.loginAdmin)

module.exports= route