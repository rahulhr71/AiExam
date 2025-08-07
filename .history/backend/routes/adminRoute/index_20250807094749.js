const router = require('express').Router();
const dashboardRoute=require('../adminRoute/dashboard.route')
const loginRoute = require('./login.route');
router.use('/dashboard', dashboardRoute);
router.use('/login',loginRoute)
module.exports = router;