const Article = require('../models/Article');
const databaseConnection = require('../db');

const handler = {};

handler.findArticles = async ({ page = 1, limit = 10, sortType = 'asc', sortBy = 'updatedAt', searchTerm = '' }) => {
    const articleInstance = new Article(databaseConnection.db.articles);
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

    return {
        articles: result,
        totalItems,
        totalPage,
        hasNext,
        hasPrev
    };

};

handler.transformedArticleToResponse = (articles) => {
    return articles.map(article => {
        const transformed = { ...article };
        transformed.author = { id: article.authorId, name: 'TODO' };
        transformed.link = `/articles/${transformed.id}`;

        return transformed;
    });
};

handler.createArticle = ({ title, body, cover = '', status = 'draft' }) => {


};

module.exports = handler;