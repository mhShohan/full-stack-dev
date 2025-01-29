const { ObjectId } = require("mongodb");
const { getDB } = require("./connection");

class ProductDB {
    constructor() {
        this.collection = getDB().db().collection("product");
    }

    async insertOne(data) {
        const result = await this.collection.insertOne(data);
        return result;
    }

    async readMany(filter, resolve = {}) {
        const stage = [];

        const catResolve = {
            $lookup: {
                from: "category",
                foreignField: "_id",
                localField: "category",
                as: "category"
            }
        };
        if (resolve.category) stage.push(catResolve);

        return await this.collection.aggregate(stage).toArray();
    }

    // async updateOne(data) {
    //     const _id = data._id;
    //     delete data._id;
    //     return await this.collection.updateOne({ _id }, { $set: data });
    // }


}

module.exports = new ProductDB();

