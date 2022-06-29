const router = require('express').Router();
const categoryController = require('../controller/categoryController');

router.delete('/:id', categoryController.delete);
router.post('/', categoryController.post);
router.get('/', categoryController.getAll);

module.exports = router;