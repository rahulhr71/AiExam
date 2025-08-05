const adminAuth = require('../../../middlewares/adminAuth')
const router=require('express').Router()

router.post('/createTeacher',adminAuth,createController)
module.exports = router