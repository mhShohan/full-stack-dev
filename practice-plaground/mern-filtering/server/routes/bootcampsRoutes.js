const router = require('express').Router();
const bootcampController = require('../controllers/bootcampController');

router.get('/', bootcampController.getAllBootcamps);
router.post('/', bootcampController.createBootcamp);
router.put('/:id', bootcampController.updateBootcamp);
router.delete('/:id', bootcampController.deleteBootcamp);



module.exports = router

