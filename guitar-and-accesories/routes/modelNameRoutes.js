const router = require('express').Router();
const productModelController = require('../controller/productModelController');

router.delete('/:id', productModelController.delete);
router.post('/', productModelController.post);

module.exports = router;