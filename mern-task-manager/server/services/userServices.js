const User = require('../model/User');
const formidable = require('formidable');
const error = require('../utils/error');

const userServices = {};

userServices.create = (body) => new User(body);
userServices.findByEmail = (email) => User.findOne({ email });




module.exports = userServices;