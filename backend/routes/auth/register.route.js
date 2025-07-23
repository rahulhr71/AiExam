const router=require('express').Router()
const {userRegister}=require('../../controllers/register')
router.get('/',userRegister)
module.exports=router