const categoryServices = require("../services/categoryServices");
const customError = require("../utils/error");


const categoryController = {
    post: async (req, res, next) => {
        try {
            const isCategoryExist = await categoryServices.findByTitle(req.body);
            if (isCategoryExist) throw customError('Category Name is already Exist!', 400);
            const category = await categoryServices.create(req.body);
            res.status(201).json({ message: 'new category created!', data: category });
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const isIdExist = await categoryServices.findById(req.params.id);
            if (!isIdExist) throw customError('Category not found!', 400);
            const result = await categoryServices.delete(req.params.id);
            res.status(203).json({ message: result.deletedCount + ' deleted!' });
        } catch (error) {
            next(error);
        }
    },
    getAll: async (_req, res, next) => {
        try {
            const result = await categoryServices.getAll();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
};


module.exports = categoryController;