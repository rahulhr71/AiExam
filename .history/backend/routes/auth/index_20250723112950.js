const router =require('express').Router();
const loginRute=require('./login.route')
const register=require('./register.route')
router.get('/login',loginRute)
router.get('/register',register)

module.exports=router