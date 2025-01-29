const router = require('express').Router();
const brandController = require('../controllers/brandController');

router.get('/', brandController.getAll);
router.post('/', brandController.create);
router.delete('/:id', brandController.delete);


module.exports = router;