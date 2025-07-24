
const dashboardController =require('../controllers/dashboardController')
const authUser=require('../middlewares/authUser')
const router=require('express').Router()
router.get('/',authUser,dashboardController)
module.exports=router