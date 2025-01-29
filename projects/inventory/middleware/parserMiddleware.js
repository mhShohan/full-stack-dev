const formidable = require("formidable");
const path = require("path");
const options = {
    uploadDir: path.join(__dirname, "../upload/"),
    multiples: true,
};


async function formParser(req, res, next) {
    const form = formidable(options);
    form.parse(req, (err, fields, files) => {
        if (err) next(err);
        req.body = fields;
        req.files = files;
        next();

    });

}

module.exports = {
    formParser
};