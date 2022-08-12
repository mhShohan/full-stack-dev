const User = require('../model/User');

const userServices = {};

userServices.create = (body) => new User(body);
userServices.findByEmail = (email) => User.findOne({ email });


module.exports = userServices;