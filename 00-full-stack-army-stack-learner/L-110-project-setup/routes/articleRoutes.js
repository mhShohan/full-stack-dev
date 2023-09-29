const router = require('express').Router();
const articleControllers = require('../controllers/articlesController');

router.get('/', articleControllers.getArticles);
router.post('/', articleControllers.createArticle);
router.get('/:id', (req, res) => { });
router.put('/:id', (req, res) => { });
router.patch('/:id', (req, res) => { });
router.delete('/:id', (req, res) => { });

module.exports = router;
