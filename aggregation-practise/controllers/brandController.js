const Brand = require('../model/BrandModel');
const handler = {};

handler.getAll = async (req, res, next) => {
    try {
        const brands = await Brand.find();
        res.json({ success: true, data: brands });
    } catch (error) {
        next(error);
    }
};
handler.create = async (req, res, next) => {
    try {
        const brand = new Brand(req.body);
        await brand.save();
        res.json({ success: true, data: brand });
    } catch (error) {
        next(error);
    }
};
handler.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Brand.findByIdAndDelete(id);
        res.json({ success: true, message: 'Deleted!' });
    } catch (error) {
        next(error);
    }
};

module.exports = handler;