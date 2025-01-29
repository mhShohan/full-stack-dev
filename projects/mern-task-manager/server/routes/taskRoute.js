const router = require('express').Router();
const taskController = require('../controller/taskController');
const verifyAuth = require('../middleware/verifyAuth');

router.get('/', verifyAuth, taskController.get);
router.post('/', verifyAuth, taskController.create);
// router.get('/:id', verifyAuth, taskController.singleTask);
router.patch('/:id', verifyAuth, taskController.update);
router.delete('/:id', verifyAuth, taskController.delete);

module.exports = router;