const customError = require("../../utils/error");
const { getDB } = require("../connectMongoDB");
const { convertToId } = require("../objectId");
const category = require('./Category');


class ProductModelName {
    constructor() {
        this.collection = getDB().db().collection('products-model');
    }
    async create(name, categoryId) {
        const cat = await category.findById(categoryId);
        if (!cat) throw customError('Invalid Category!', 400);

        return await this.collection.insertOne({ name, category: cat });
    }
    async delete(id) {
        const _id = convertToId(id);
        return await this.collection.deleteOne({ _id });
    }
}


module.exports = new ProductModelName();