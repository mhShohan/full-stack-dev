const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { findUserByProperty, createNewUser } = require('../services/userService');
const error = require("../utils/error");
const User = require("../models/User");


const handler = {};

/**
 * 
 * @param {{name: string,email:string, password:string}} body 
 * @returns {{isUserExist:boolean,newUser: <User>}} 
 */
handler.registerService = async ({ name, email, password, roles, accountStatus }) => {
    const isUserExist = await findUserByProperty('email', email);

    if (isUserExist) throw error('User already exist!', 400);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return createNewUser({ name, email, password: hashedPassword, roles, accountStatus });
};

/**
 * 
 * @param {{email:string, password:string}} body 
 * @returns {{user: <User>, token: string, isPasswordMatch: boolean}} 
 */
handler.loginService = async ({ email, password }) => {

    let token;
    const user = await findUserByProperty('email', email);

    if (!user) throw error('Invalid Credential', 400);


    const payload = { _id: user._id, name: user.name, email: user.email, roles: user.roles, accountStatus: user.accountStatus };
    isPasswordMatch = await bcrypt.compare(password, user.password);
    token = jwt.sign(payload, 'secret-key', { expiresIn: '2h' });


    if (!isPasswordMatch) throw error('Invalid Credential', 400);
    return { token };

};

module.exports = handler;