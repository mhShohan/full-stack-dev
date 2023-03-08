const Category = require('../model/CategoryModel');

const handler = {};

handler.getAll = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json({ success: true, data: categories });
    } catch (err) {
        next(err);
    }
};

handler.create = async (req, res, next) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.json({ success: true, data: category });
    } catch (err) {
        next(err);
    }
};

handler.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.json({ success: true, message: 'Deleted!' });
    } catch (err) {
        next(err);
    }
};


module.exports = handler;