const { isValidId } = require("../database/mongodb/mongoUtils");


async function categoryUpdateValidator(input) {
    const error = {};

    if (!input._id || !isValidId(input._id)) error._id = "invalid id";

    if (input.title) {
        if (typeof input.title !== "string" || !input.title.trim().length) error.title = "invalid title";
    }

    if ("description" in input) {
        if (typeof input.description !== "string" || typeof input.description === "boolean") error.description = "invalid description";

    }

    return error;

}
module.exports = categoryUpdateValidator;