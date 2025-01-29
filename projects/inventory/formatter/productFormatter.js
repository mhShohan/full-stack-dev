const { convertToId } = require("../database/mongodb/mongoUtils");

async function productFormatter(input) {
    const data = {};
    data.title = input.title.trim();
    data.description = input.description ? input.description.trim() : null;
    data.category = convertToId(input.category);
    data.price = parseFloat(input.price);
    return data;
}

module.exports = productFormatter;