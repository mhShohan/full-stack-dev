const productModelName = require('../database/models/ModelName');
const { stringValidator } = require('../validator/categoryValidator');


const productModelServices = {};

productModelServices.create = (title, categoryId) => {
    const name = stringValidator(title);
    return productModelName.create(name, categoryId);
};
productModelServices.delete = (id) => {
    return productModelName.delete(id);
};

module.exports = productModelServices;