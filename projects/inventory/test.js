const sanitizer = (getCategoryById, convertToId) => {
    let category;
    const validator = (input) => {
        const error = {};
        if (!category) {
            category = getCategoryById(input.category);
            console.log(getCategoryById(input.category));
        }
        if (!category) error.category = "invalid category id";
        return error;
    };

    const formatter = (input) => {
        const entity = {};
        entity.category = convertToId(input.category);
        return entity;
    };

    return {
        validator,
        formatter
    };

};

function a(id) {
    return id.length;
}
function b(id) {
    return id + id;
}

{
    const productSanitizer = sanitizer(a, b);
    const validator = productSanitizer.validator({ category: '4444' });
    if (Object.keys(validator).length) console.log(validator);
    const entity = productSanitizer.formatter({ category: '4444' });
}