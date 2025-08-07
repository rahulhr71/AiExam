const router = require('express').Router();
const dashboardRoute=require('../adminRoute/dashboard.route')

router.use('/dashboard', dashboardRoute);

module.exports = router;