const {userLogin}=require('../../controllers/login')
const router=require('express').Router()
router.get('/',userLogin);
module.exports=router