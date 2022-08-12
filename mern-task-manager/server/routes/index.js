const router = require('express').Router();

router.use('/user', require('./userRoute'));
router.use('/tasks', require('./taskRoute'));

module.exports = router;