const categoryController = require("../controller/categoryController");
const errHandler = require("../middleware/errHandler");
const { formParser } = require("../middleware/parserMiddleware");

const router = require("express").Router();

// router.use(formParser);

router.post("/", async (req, res, next) => {
    try {
        const createCategory = await categoryController.create(req);
        res.json({
            data: createCategory
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const getAllCategory = await categoryController.getAll(req.query);
        res.json({
            data: getAllCategory
        });
    } catch (e) {
        next(e);
    }
});

router.put("/", async (req, res, next) => {
    try {
        const updateCategory = await categoryController.update(req);
        res.json({
            data: updateCategory
        });
    } catch (e) {
        next(e);
    }
});

router.use(errHandler);

module.exports = router;

