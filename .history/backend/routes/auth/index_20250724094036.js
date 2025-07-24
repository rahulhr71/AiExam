const router =require('express').Router();
const {loginRute}=require('./login.route')
const register=require('./register.route')
router.use('/login',loginRute)
router.use('/register',register)

module.exports=router