const ProductServices = require("../services/productServices");

const productServices = new ProductServices();

const productController = {

    create: async (req) => {
        const data = req.body;
        const create = await productServices.create(data);
        return create;
    },
    getAll: async (query) => {
        const filter = {};
        filter.title = query.title && query.title;
        filter.description = query.description && query.description;
        filter.category = query.category && query.category;

        const resolve = {};
        resolve.category = query.resolveCategory == "1";

        const getAll = await productServices.getAll(filter, resolve);
        return getAll;
    },
    // update: async (req) => {
    //     const update = await productServices.update(req.body);
    //     return update;
    // }

};

module.exports = productController;