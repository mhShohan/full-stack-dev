const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();
const OpenApiValidator = require('express-openapi-validator');
const Article = require('./models/Article');

// express APP
const app = express();

// middlewares
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(YAML.load('./swagger.yaml')));
app.use(
    OpenApiValidator.middleware({
        apiSpec: './swagger.yaml',
    }),
);

// health route
app.get('/health', (_req, res) => {
    return res.status(200).json({ status: 'OK' });
});

// routes
app.get('/api/v1/articles', async (req, res) => {
    // 1. extract the query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortType = req.query.sort_type || 'asc';
    const sortBy = req.query.sortBy || 'updatedAt';
    const searchTerm = req.query.search || '';

    const articleInstance = new Article();
    await articleInstance.init();

    let articles;

    //filter by search term
    if (searchTerm) {
        articles = await articleInstance.search(searchTerm);
    } else {
        articles = await articleInstance.find();
    }

    // sort
    articles = await articleInstance.sort(articles, sortType, sortBy);

    // pagination 
    const {
        result,
        totalItems,
        totalPage,
        hasNext,
        hasPrev
    } = await articleInstance.pagination(articles, page, limit);

    articles = result;

    articles = articles.map(article => {
        const transformed = { ...article };
        transformed.author = { id: article.authorId, name: 'TODO' };
        transformed.link = `/articles/${transformed.id}`;

        return transformed;
    });

    const responses = {
        data: articles,
        pagination: { page, limit, next: 3, prev: 1, totalPage, totalItems },
        links: {
            self: req.url,
        }
    };
    if (hasPrev) {
        responses.pagination.prev = page - 1;
        responses.links.prev = `/articles?page=${page - 1}&limit=${limit}`;
    }
    if (hasNext) {
        responses.pagination.next = page + 1;
        responses.links.next = `/articles?page=${page + 1}&limit=${limit}`;
    }
    res.status(200).json(responses);
});
app.post('/api/v1/articles', (req, res) => { });
app.get('/api/v1/articles/:id', (req, res) => { });
app.put('/api/v1/articles/:id', (req, res) => { });
app.patch('/api/v1/articles/:id', (req, res) => { });
app.delete('/api/v1/articles/:id', (req, res) => { });

// env variables
const PORT = process.env.PORT || 4000;

app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

// server listening
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));