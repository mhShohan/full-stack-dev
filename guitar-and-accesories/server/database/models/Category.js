const categoryValidator = require('../../validator/categoryValidator');
const { getDB } = require('../connectMongoDB');
const { convertToId } = require('../objectId');

class Category {
    constructor() {
        this.collection = getDB().db().collection('category');
    }
    async create(body) {
        const title = categoryValidator.stringValidator(body);
        return await this.collection.insertOne({ title });
    }
    async findByTitle(title) {
        return await this.collection.findOne({ title });
    }
    async findById(id) {
        const _id = convertToId(id);
        return await this.collection.findOne({ _id });
    }
    async delete(id) {
        const _id = convertToId(id);
        return this.collection.deleteOne({ _id });
    }
    async findAll() {
        return this.collection.find({}).toArray();
    }
}

module.exports = new Category();