const { getDisable, getEnable, getStatus } = require('../controllers/adminAttendanceController');

const router = require('express').Router();

router.get('/enable', getEnable);
router.get('/disable', getDisable);
router.get('/status', getStatus);

module.exports = router;