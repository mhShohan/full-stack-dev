const router = require('express').Router();

router.use('/category', require('./categoryRoute'));

module.exports = router;