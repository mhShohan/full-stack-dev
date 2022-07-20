const router = require('express').Router();

const categoryController = require('../controller/categoryController');

router.get('/', categoryController.getAll);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.delete);

module.exports = router;