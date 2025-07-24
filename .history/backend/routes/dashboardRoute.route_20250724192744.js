const { default: Dashboard } = require('../../frontend/src/pages/Dashboard')

const router=require('express').Router()
router.get('/',dashboardController)
module.exports=router