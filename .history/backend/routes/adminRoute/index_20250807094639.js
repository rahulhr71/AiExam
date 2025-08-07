const router = require('express').Router();
const dashboardRoute=require('../adminRoute/dashboard.route')
router.use('/dashboard', (req, res) => {
    res.send('Admin Dashboard');
})
module.exports = router;