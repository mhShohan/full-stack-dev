const categoryDB = require("../database/mongodb/categoryDB");
const categoryFormatter = require("../formatter/categoryFormatter");
const categoryUpdateFormatter = require("../formatter/categoryUpdateFormatter");
const categoryUpdateValidator = require("../validator/categoryUpdateValidator");
const categoryValidator = require("../validator/categoryValidator");

class CategoryServices {
    constructor() {
        this.db = categoryDB;
    }
    async create(data) {
        const error = await categoryValidator(data);
        if (Object.keys(error).length) throw error;
        const validateData = await categoryFormatter(data);
        const result = await this.db.insertOne(validateData);
        return result;
    }
    async getAll(filter) {
        const result = await this.db.readMany(filter);
        return result;
    }

    async update(data) {
        const error = await categoryUpdateValidator(data);
        if (Object.keys(error).length) throw error;
        const validateData = categoryUpdateFormatter(data);
        const result = await this.db.updateOne(validateData);
        return result;
    }
}

module.exports = CategoryServices;