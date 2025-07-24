const {userLogin}=require('../../controllers/login')
const router=require('express').Router()
router.post('/',userLogin);
module.exports=router