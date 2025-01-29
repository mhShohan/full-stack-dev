const productController = require("../controller/productController");
const errHandler = require("../middleware/errHandler");

const router = require("express").Router();

// router.use(formParser);

router.post("/", async (req, res, next) => {
    try {
        const createProduct = await productController.create(req);
        res.json({
            data: createProduct
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const getAllProduct = await productController.getAll(req.query);
        res.json({
            data: getAllProduct
        });
    } catch (e) {
        next(e);
    }
});

// router.put("/", async (req, res, next) => {
//     try {
//         const updateProduct = await productController.update(req);
//         res.json({
//             data: updateProduct
//         });
//     } catch (e) {
//         next(e);
//     }
// });

router.use(errHandler);

module.exports = router;

