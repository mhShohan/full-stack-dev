const CategoryServices = require("../services/categoryServices");

const categoryServices = new CategoryServices();

const categoryController = {

    create: async (req) => {
        const data = req.body;
        const create = await categoryServices.create(data);
        return create;
    },
    getAll: async (query) => {
        const filter = {};
        filter.title = query.title && query.title;
        filter.description = query.description && query.description;
        console.log(filter);
        const getAll = await categoryServices.getAll(filter);
        return getAll;
    },
    update: async (req) => {
        const update = await categoryServices.update(req.body);
        return update;
    }

};

module.exports = categoryController;