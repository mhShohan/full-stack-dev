async function categoryFormatter(input) {
    const data = {};
    data.title = input.title.trim();
    data.description = input.description ? input.description.trim() : null;
    return data;
}

module.exports = categoryFormatter;