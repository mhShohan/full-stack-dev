const mongoose = require('mongoose');
const Product = require('../model/ProductModel');
const Review = require('../model/ReviewModel');


const handler = {};

handler.createReview = async (req, res, next) => {
    try {
        const review = new Review({
            product_id: req.params.id,
            description: req.body.description,
            rating: req.body.rating
        });
        await review.save();
        res.json({ success: true, data: review });
    } catch (error) {
        next(error);
    }
};

handler.getAll = async (req, res, next) => {
    try {
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: "brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    as: "brand"
                }
            }, {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            }, {
                $unset: ["__v", "createdAt", "updatedAt", "brand_id", "category_id"]
            }
        ]);
        res.json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};
handler.getSingleProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.aggregate([
            {
                $match: {
                    _id: { $eq: new mongoose.Types.ObjectId(id) }
                }
            }, {
                $lookup: {
                    from: "brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    as: "brand"
                }
            }, {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            }, {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "reviews"
                }
            }, {
                $unset: ["__v", "createdAt", "updatedAt", "brand_id", "category_id"]
            }
        ]);
        res.json({ success: true, data: product[0] });
    } catch (error) {
        next(error);
    }
};
handler.create = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};
handler.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ success: true, data: "Product Deleted!" });
    } catch (error) {
        next(error);
    }
};
handler.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
        res.json({ success: true, data: updatedProduct });
    } catch (error) {
        next(error);
    }
};

module.exports = handler;