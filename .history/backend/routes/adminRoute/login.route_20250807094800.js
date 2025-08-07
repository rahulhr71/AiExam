const router=require('express').Router()
const adminLogin=require('../../../controllers/adminLogin')
router.post('/',adminLogin)
module.exports=router