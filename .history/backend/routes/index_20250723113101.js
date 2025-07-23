const router=require('express').Router()
const authRoute=require('./auth/index')
router.get('/auth',authRoute)

module.exports=router;