const router = require('express').Router();
const studentAttendanceController = require('../controllers/student-attendance-controller');


router.get('/status', studentAttendanceController.getAttendanceStatus);
router.get('/:id', studentAttendanceController.getAttendance);


module.exports = router;