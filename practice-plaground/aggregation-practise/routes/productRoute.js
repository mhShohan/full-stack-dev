const router = require('express').Router();
const productController = require('../controllers/productController');

router.delete('/:id', productController.delete);
router.post('/:id', productController.createReview);
router.patch('/:id', productController.update);
router.get('/:id', productController.getSingleProduct);
router.get('/', productController.getAll);
router.post('/', productController.create);

module.exports = router;