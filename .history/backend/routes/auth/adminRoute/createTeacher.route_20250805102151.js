const adminAuth = require('../../../middlewares/adminAuth')
const router=require('express').Router()

router.post('/createTeacher',createController)
module.exports = router