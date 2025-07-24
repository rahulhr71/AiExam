
const dashboardController =require('../controllers/dashboardController')
const router=require('express').Router()
router.get('/',dashboardController)
module.exports=router