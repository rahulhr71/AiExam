const router=require('express').Router()
const authUser =require('../middlewares/authUser')
router.post('/',authUser,logoutControler)

module.exports=router