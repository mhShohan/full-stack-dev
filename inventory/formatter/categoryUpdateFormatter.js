const { convertToId } = require("../database/mongodb/mongoUtils");

function categoryUpdateFormatter(input) {
    const data = {};
    data._id = convertToId(input._id.trim());
    if ("title" in input) data.title = input.title.trim();
    if ("description" in input) data.description = typeof input.description === "string" ? input.description.trim() : null;
    return data;
}

module.exports = categoryUpdateFormatter;