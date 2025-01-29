const router = require('express').Router();
const verifyAuth = require('../middleware/auth');

router.use('/api/v1/auth', require('./authRoute'));
router.use('/api/v1/users', verifyAuth, require('./usersRoute'));
router.use('/api/v1/admin/attendance', verifyAuth, require('./adminAttendanceRoute'));
router.use('/api/v1/student/attendance', verifyAuth, require('./student-attendance-route'));

module.exports = router;