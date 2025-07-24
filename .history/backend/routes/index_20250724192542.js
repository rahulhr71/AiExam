const router=require('express').Router()
const { default: Dashboard } = require('../../frontend/src/pages/Dashboard');
const authRoute=require('./auth/index')
router.use('/auth',authRoute)
router.use('/dashboard',dashboardRoute)
module.exports=router;