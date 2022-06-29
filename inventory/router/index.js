const router = require("express").Router();


router.use("/category", require("./category"));
router.use("/product", require("./product"));

module.exports = router;