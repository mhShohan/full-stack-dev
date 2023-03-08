const Review = require('../model/ReviewModel');

const handler = {};

handler.getAll = async (req, res, next) => {
    try {
        const reviews = await Review.find();
        res.json({ success: true, data: reviews });
    } catch (error) {
        next();
    }
};
handler.create = async (req, res, next) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.json({ success: true, data: review });
    } catch (error) {
        next();
    }
};
handler.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        res.json({ success: true, message: 'Review Deleted!' });
    } catch (error) {
        next();
    }
};

module.exports = handler;