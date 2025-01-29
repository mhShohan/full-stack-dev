const router = require('express').Router();

router.use('/category', require('./categoryRoute'));
router.use('/brand', require('./brandRoute'));
router.use('/product', require('./productRoute'));
router.use('/review', require('./reviewRoute'));

module.exports = router;