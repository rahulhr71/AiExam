const router=require('express').Router()
const dashboardRoute =require('./dashboardRoute.route')
const authRoute=require('./auth/index')
router.use('/auth',authRoute)
router.use('/dashboard',dashboardRoute)
module.exports=router;