const { ObjectId } = require("mongodb");
const { getDB } = require("./connection");

class CategoryDB {
    constructor() {
        this.collection = getDB().db().collection("category");
    }

    async insertOne(data) {
        const result = await this.collection.insertOne(data);
        return result;
    }

    async readMany(filter, resolve = {}) {
        const matchStage = {};

        if (filter.title) matchStage.title = filter.title;
        if (filter.description) matchStage.description = filter.description;

        return await this.collection.find(matchStage).toArray();
    }

    async updateOne(data) {
        const _id = data._id;
        delete data._id;
        return await this.collection.updateOne({ _id }, { $set: data });
    }


}

module.exports = new CategoryDB();

