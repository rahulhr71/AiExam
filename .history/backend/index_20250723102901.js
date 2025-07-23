const express=require('express')
const app =express()
require('.env').config()

console.log(process.env.PORT)