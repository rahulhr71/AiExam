const express=require('express');
const mongoose  = require('mongoose');
const app =express()
const cors=require('cors')
require('dotenv').config()
const port=process.env.PORT;
const dbUrl=process.env.DB
app.use(cors(
    {
        origin:"*"
    }
))
app.get('/',(req,res)=>res.status(200).json({message:"welcome to this api"}))
mongoose.connect(dbUrl).then((r)=>{
console.log("DB connected Successfully");
app.listen(port,()=>console.log(`server started at http://localhost:${port}`))
}).catch(e=>console.log(e))



