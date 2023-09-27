const router = require('express').Router();

router.use('/articles', require('./articleRoutes'));

module.exports = router;