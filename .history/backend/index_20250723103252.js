const express=require('express')
const app =express()
require('dotenv').config()
const port=process.env.PORT;
app.get('/',(req,res)=>res.status(200).json({message:"welcome to this api"}))
app.listen(port,()=>console.log(`server started at http://localhost:${port}`))