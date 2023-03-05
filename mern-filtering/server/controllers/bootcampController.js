const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require("../utils/errorResponse");
const { findByIdAndDelete } = require("../models/Bootcamp");


const handler = {};

handler.getAllBootcamps = asyncHandler(async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query };

    //remove the field i reqQuery which in the array
    const removeField = ['sort'];
    removeField.forEach(val => delete reqQuery[val]);

    // stringify the query Object
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, (match) => `$${match}`);

    query = Bootcamp.find(JSON.parse(queryStr));

    //sort 
    if (req.query.sort) {
        const sortStr = req.query.sort.split(',').join(' ');
        query = query.sort(sortStr);
    }

    const maxPrice = await Bootcamp.find().sort({ price: -1 }).limit(1).select('-_id price');
    const minPrice = await Bootcamp.find().sort({ price: 1 }).limit(1).select('-_id price');

    const priceRange = { maxPrice: maxPrice[0].price, minPrice: minPrice[0].price };

    const boot = await query;
    res.status(200).json({ success: true, data: boot, priceRange });
});


handler.createBootcamp = asyncHandler(async (req, res, next) => {
    const newBootCamp = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data: newBootCamp });
});


handler.updateBootcamp = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let bootCamp = await Bootcamp.findById(id);

    if (!bootCamp) return next(ErrorResponse('Not Found!', 404));

    bootCamp = await Bootcamp.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    res.status(201).json({
        success: true,
        data: bootCamp
    });
});

handler.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let bootCamp = await Bootcamp.findById(id);

    if (!bootCamp) return next(ErrorResponse('Not Found!', 404));

    await Bootcamp.findByIdAndDelete(id);

    res.status(201).json({
        success: true,
        data: {}
    });
});

module.exports = handler;