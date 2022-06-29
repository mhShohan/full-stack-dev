const User = require("../models/User");
const { isValidObjectId } = require('mongoose');
const error = require("../utils/error");


const handler = {};


handler.findUsers = () => {
    return User.find();
};

/**
 * @param {string} FindKey 
 * @param {string} FindValue 
 * @returns 
 */
handler.findUserByProperty = (key, value) => {
    if (key === '_id' && !isValidObjectId(value)) throw error('Invalid user id!', 404);
    if (key === '_id') return User.findById(value);
    return User.findOne({ [key]: value });
};

/**
 * 
 * @param {{name: string,email:string, password:string,roles:['string'], accountStatus:string}} body 
 * @returns {{<User>}} 
 */
handler.createNewUser = ({ name, email, password, roles, accountStatus }) => {
    const user = new User({
        name,
        email,
        password,
        roles: roles ? roles : ['STUDENT'],
        accountStatus: accountStatus ? accountStatus : 'PENDING'
    });
    return user.save();
};

/**
 * 
 * @param {string} id 
 * @param {{name: string,email:string, password:string,roles:['string'], accountStatus:string}} data 
 * @returns 
 */
handler.updateUser = async (id, data) => {
    const user = await handler.findUserByProperty('email', data.email);
    if (user) throw error('User already existed with this email!');

    return User.findByIdAndUpdate(id, { ...data }, { new: true });
};


module.exports = handler;