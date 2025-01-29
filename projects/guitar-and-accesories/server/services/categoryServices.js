const Category = require('../model/Category');

const categoryServices = {
    isExists: (key, value) => Category.findOne({ [key]: value }),
    get: () => Category.find({}),
    create: (body) => new Category(body),
    delete: (id) => Category.findByIdAndDelete(id),
};


module.exports = categoryServices;