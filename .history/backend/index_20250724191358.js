const express=require('express')
const mongoose  = require('mongoose')
const cookieParser=require('cookie-parser')
const app =express()
const handleRoute=require('./routes/index')
const cors=require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const port=process.env.PORT
const dbUrl=process.env.DB
app.use(cors())

app.use(express.json())
app.use(cookieParser());
app.use('/api',handleRoute)
mongoose.connect(dbUrl).then((r)=>{
console.log("DB connected Successfully");
app.listen(port,()=>console.log(`server started at http://localhost:${port}`))
}).catch(e=>console.log(e))