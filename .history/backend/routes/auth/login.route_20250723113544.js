const {userLogin}=require('../../controllers/login')
const router=require('express').Router()
router.get('/',loginController)
module.exports=router