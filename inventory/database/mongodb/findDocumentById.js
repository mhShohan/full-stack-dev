const { getDB } = require("./connection");
const { convertToId } = require("./mongoUtils");


class GetDocumentById {
    constructor(collection) {
        this.db = getDB().db().collection(collection);
    }
    async readDocumentById(_id) {
        return await this.db.findOne({ _id: convertToId(_id) });
    }
}

module.exports = GetDocumentById;