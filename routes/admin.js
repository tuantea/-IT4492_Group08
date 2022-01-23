const express = require('express')
const router = express.Router()
const adminController = require('../controller/admin')

router.get('/phone',adminController.getUserByPhone)
router.get('/all',adminController.getAllUser)
router.delete('/deleteuser',adminController.getUserById)
router.get('/active',adminController.active)
router.get('/inactive',adminController.inactive)
router.get('/blocked',adminController.blocked)
module.exports = router