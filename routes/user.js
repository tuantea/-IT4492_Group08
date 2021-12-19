const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/changepassword', userController.changepassword)
router.post('/updateuserinfo',userController.updateUserInfo)
 

module.exports = router