const productDB = require("../database/mongodb/productDB");
const productFormatter = require("../formatter/productFormatter");
// const productUpdateFormatter = require("../formatter/productUpdateFormatter");
// const productUpdateValidator = require("../validator/productUpdateValidator");
const productValidator = require("../validator/productValidator");

class ProductServices {
    constructor() {
        this.db = productDB;
    }
    async create(data) {
        const error = await productValidator(data);
        if (Object.keys(error).length) throw error;
        const validateData = await productFormatter(data);
        const result = await this.db.insertOne(validateData);
        return result;
    }
    async getAll(filter, resolve) {
        const result = await this.db.readMany(filter, resolve);
        return result;
    }

    // async update(data) {
    //     const error = await productUpdateValidator(data);
    //     if (Object.keys(error).length) throw error;
    //     const validateData = productUpdateFormatter(data);
    //     const result = await this.db.updateOne(validateData);
    //     return result;
    // }
}

module.exports = ProductServices;