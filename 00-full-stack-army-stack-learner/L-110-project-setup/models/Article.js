const connection = require('../db.js');

class Article {
    constructor(articles) {
        this.articles = articles;
    }

    async find() {
        return this.articles;
    }

    async findById(id) {
        return this.articles.find(article => article.id === id);
    }

    async findByProp(prop) {
        return this.articles.find(article => article[prop] === prop);
    }

    async search(searchTerm) {
        return this.articles.filter(article => article.title.toLowerCase().includes(searchTerm));
    }

    async sort(articles, sortType = 'asc', sortBy = 'updatedAt') {
        let result;

        if (sortType === 'asc') {
            result = await this.#sortAsc(articles, sortBy);
        }
        else {
            result = await this.#sortDsc(articles, sortBy);
        }

        return result;
    }

    async #sortDsc(articles, sortBy) {
        return articles.sort((a, b) => a[sortBy].toString().localeCompare(b[sortBy].toString()));
    }

    async #sortAsc(articles, sortBy) {
        return articles.sort((a, b) => b[sortBy].toString().localeCompare(a[sortBy].toString()));
    }

    async pagination(articles, page, limit) {
        const skip = page * limit - limit;
        const totalItems = articles.length;
        const totalPage = Math.ceil(totalItems / limit);
        const result = articles.slice(skip, skip + limit);

        return {
            result,
            totalItems,
            totalPage,
            hasNext: page < totalPage,
            hasPrev: page > 1
        };
    }
}

module.exports = Article;