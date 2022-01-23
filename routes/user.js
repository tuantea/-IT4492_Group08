const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/changepassword', userController.changepassword)
router.put('/updateuserinfo',userController.updateUserInfo)
router.get('/getuserinfo',userController.getUserInfo)
router.delete('/deleteuser',userController.deleteUser)

module.exports = router