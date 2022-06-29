const productModelServices = require("../services/productModelServices");

const productModelController = {};

productModelController.post = async (req, res, next) => {
    try {
        const { name, categoryId } = req.body;
        const result = await productModelServices.create(name, categoryId);
        res.status(201).json({ message: 'ModelName created!', result });
    } catch (error) {
        next(error);
    }
};

productModelController.delete = async (req, res, next) => {
    try {
        const result = await productModelServices.delete(req.params.id);
        res.status(203).json({ message: result.deletedCount + ' deleted!' });
    } catch (error) {
        next(error);
    }
};

module.exports = productModelController;