const router=require('express').Router()
const dashboardRoute =require('./dashboardRoute.route')
const authRoute=require('./auth/index') 
const logoutRoute=require('./logout.route')
router.use('/auth',authRoute)
router.use('/dashboard',dashboardRoute) 
router.use('/logout',logoutRoute)
module.exports=router;