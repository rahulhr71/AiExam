const router = require('express').Router();
router.get('/summery', (req, res) => {
    res.send('Admin Dashboard');
});
module.exports = router;