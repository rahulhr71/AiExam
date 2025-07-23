const router=require('express').Router()

router.get('/auth',(req,res)=>{res.send("hllo this is auth api")})

module.exports=router;