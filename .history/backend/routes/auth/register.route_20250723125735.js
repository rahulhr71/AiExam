const router=require('express').Router()
const {userRegister}=require('../../controllers/register')
router.post('/',userRegister)
module.exports=router