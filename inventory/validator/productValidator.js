const GetDocumentById = require("../database/mongodb/findDocumentById");
const { isValidId } = require("../database/mongodb/mongoUtils");

const getCategory = new GetDocumentById("category");

async function productValidator(input) {
    const error = {};
    if (!input.title || typeof input.title !== "string" || !input.title.trim().length) error.title = "invalid title";


    if (!input.category || !isValidId(input.category)) error.category = "invalid id";
    else {
        const category = await getCategory.readDocumentById(input.category.trim());
        if (!category) error.category = "no category found with given id";
    }

    if (!input.price || isNaN(input.price) || input.price < 0) error.price = "invalid price";

    if (input.description) {
        if (typeof input.description !== "string" || !input.description.trim().length) error.description = "invalid description";
    }

    return error;

}
module.exports = productValidator;