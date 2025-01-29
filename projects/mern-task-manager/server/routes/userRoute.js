const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/check-login', userController.checkLogin);
router.get('/avatar', userController.avatar);
router.post('/avatar-update', userController.updateAvatar);
router.patch('/update-profile', userController.update);

module.exports = router;