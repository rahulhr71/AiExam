
const dashboardController =require('../controllers/dashboardController')
const authUser=require('../middlewares/adminAuth')
const router=require('express').Router()
router.get('/',authUser,dashboardController)
router.get('/admin/',authUser,dashboardController)
module.exports=router