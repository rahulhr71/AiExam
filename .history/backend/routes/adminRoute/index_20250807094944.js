const router = require('express').Router();
const dashboardRoute=require('../adminRoute/dashboard.route')
const loginRoute = require('./login.route');
router.use('/dashboard', dashboardRoute);

module.exports = router;