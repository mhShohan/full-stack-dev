const router = require('express').Router()
const { registerUser, loginUser } = require('../controllers/authController')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

module.exports = router

