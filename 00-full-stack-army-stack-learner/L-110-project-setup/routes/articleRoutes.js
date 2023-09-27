const router = require('express').Router();
const articleControllers = require('../controllers/articles');

router.use('/', articleControllers.getArticles);
router.post('/', (req, res) => { });
router.get('/:id', (req, res) => { });
router.put('/:id', (req, res) => { });
router.patch('/:id', (req, res) => { });
router.delete('/:id', (req, res) => { });

module.exports = router;
