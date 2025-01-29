const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAll);
router.post('/', reviewController.create);
router.delete('/:id', reviewController.delete);


module.exports = router;