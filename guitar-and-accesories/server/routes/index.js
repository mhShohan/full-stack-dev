const router = require('express').Router();

router.use('/category', require('./categoryRoute'));
router.use('/product/model', require('./modelNameRoutes'));

module.exports = router;