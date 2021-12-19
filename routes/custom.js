const express = require('express')
const router = express.Router()
const customController = require('../controller/custom')

router.post('/add', customController.addCustom)
router.get('/getcustominfo',customController.getCustomInfo)
router.get('/all',customController.getAllCustom)

 

module.exports = router