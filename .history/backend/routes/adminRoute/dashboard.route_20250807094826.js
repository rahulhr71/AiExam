const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('Admin Dashboard');
});
module.exports = router;