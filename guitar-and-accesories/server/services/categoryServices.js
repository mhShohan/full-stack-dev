const categoryDB = require('../database/models/Category');

const categoryServices = {
    create: ({ title }) => {
        return categoryDB.create(title);
    },
    findByTitle: ({ title }) => {
        return categoryDB.findByTitle(title);
    },
    findById: (id) => {
        return categoryDB.findById(id);
    },
    delete: (id) => {
        return categoryDB.delete(id);
    },
    getAll: () => {
        return categoryDB.findAll();
    }
};


module.exports = categoryServices;