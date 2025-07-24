const router=require('express').Router()
const authUser =require('../middlewares/authUser')
const logoutControler=require('../controllers/logout')
router.get('/',authUser,logoutControler)

module.exports=router