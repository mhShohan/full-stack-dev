async function categoryValidator(input) {
    const error = {};
    const data = {};
    if (!input.title || typeof input.title !== "string" || !input.title.trim().length) error.title = "invalid title";

    if (input.description) {
        if (typeof input.description !== "string" || !input.description.trim().length) error.description = "invalid description";
    }

    return error;

}
module.exports = categoryValidator;