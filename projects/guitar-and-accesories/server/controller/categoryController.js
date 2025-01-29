const categoryServices = require('../services/categoryServices');
const customError = require('../utils/error');
const isValid = require('../utils/isValid');

const categoryController = {
    getAll: async (_req, res, next) => {
        try {
            const categories = await categoryServices.get();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const isExist = await categoryServices.isExists('title', req.body.title);
            if (isExist) throw customError('Category Already Exists', 400);

            const category = categoryServices.create({ title: req.body.title });
            await category.save();
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
        try {
            if (!isValid.id(id)) throw customError('Category Not Found!', 404);
            const isExist = await categoryServices.isExists('_id', req.params.id);
            if (!isExist) throw customError('Category Not Found!', 404);

            await categoryServices.delete(req.params.id);
            res.status(203).json({ message: 'Delete Successfully!' });
        } catch (error) {
            next(error);
        }
    },
};




module.exports = categoryController;