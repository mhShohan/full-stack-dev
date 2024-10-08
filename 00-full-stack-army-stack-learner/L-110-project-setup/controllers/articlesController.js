const articleServices = require('../services/articlesServices');

const handler = {};

handler.getArticles = async (req, res) => {
    // 1. extract the query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortType = req.query.sort_type || 'asc';
    const sortBy = req.query.sortBy || 'updatedAt';
    const searchTerm = req.query.search || '';

    let { articles,
        totalItems,
        totalPage,
        hasNext,
        hasPrev } = await articleServices.findArticles({ page, limit, sortType, sortBy, searchTerm });

    const responses = {
        data: articleServices.transformedArticleToResponse(articles),
        pagination: { page, limit, next: hasNext ? page + 1 : null, prev: hasPrev ? page - 1 : null, totalPage, totalItems },
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
};

handler.createArticle = async (req, res) => {
    // step: 1, extract incoming data
    const { title, body, cover, status, } = req.body;

    // step: 2, invoke the service function
    const article = await articleServices.create({ title, body, cover, status, authorId: req.user.id });

    // step: 3, generate response
    const response = {
        code: 201,
        message: 'Article Created Successfully',
        data: article,
        links: {
            self: `${req.url}/${article.id}`,
            author: `${req.url}/${article.id}/author`,
            comment: `${req.url}/${article.id}/comment`,
        }
    };
    res.status(201).json(response);
};

module.exports = handler;