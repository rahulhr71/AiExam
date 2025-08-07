const router=require('express').Router()
const teacherLogin=require('../../controllers/teacherLogin')
router.post('/login',teacherLogin)
module.exports=router