import Users from "./registerUser"
const mongoose=require('mongoose')
const courseSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:50,
        trim:true
    }
})