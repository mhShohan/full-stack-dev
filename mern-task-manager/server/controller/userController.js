const bcrypt = require('bcrypt');
const error = require('../utils/error');
const { generateToken } = require('../utils/utils');
const userServices = require('../services/userServices');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const userController = {};


userController.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) throw error('Enter same password', 400, 'misMatchPassword');
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = userServices.create({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        const token = generateToken({ name: user.firstName + ' ' + user.lastName, _id: user._id, email: user.email });

        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }).status(203).json(true);
    } catch (err) {

        let errors = { status: 400 };

        if (err.code === 11000) {
            errors.email = 'Email Already Registered!';
        }
        if (err.type === 'misMatchPassword') {
            errors.password = 'Please Enter the Same password!';
        }

        if (err.message.includes('user validation failed:')) {
            Object.values(err.errors).forEach((err) => {
                errors[err.properties.path] = err.properties.message;
            });
        }

        next(errors);
    }
};
userController.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const isUserExist = await userServices.findByEmail(email);
        if (!isUserExist) throw error('User does not exist!', 404, 'wrongUser!');

        const passwordMatched = await bcrypt.compare(password, isUserExist.password);
        if (!passwordMatched) throw error('Wrong Credentials', 404, 'wrongUser!');

        const token = generateToken({ name: isUserExist.firstName + ' ' + isUserExist.lastName, _id: isUserExist._id, email: isUserExist.email });

        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }).status(200).json(true);
    } catch (err) {
        const errors = { status: err.status };

        if (err.type === 'wrongUser!') {
            errors.email = 'Email or Password Wrong!';
            errors.password = 'Email or Password Wrong!';
        }
        next(errors);
    }
};
userController.logout = async (_req, res, next) => {
    try {
        return res.cookie('token', '', { httpOnly: true, maxAge: 0 }).status(203).send();
    } catch (e) {
        next(e);
    }
};
userController.checkLogin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw error('Please Login or Register!', 400, 'unauthorized');
        const user = jwt.verify(token, process.env.JWT);

        const loggedUser = await userServices.findByEmail(user.email);


        res.json({ status: true, user: loggedUser });
    } catch (err) {
        // console.log(errors);
        // let errors = {};

        // if (err.type === 'unauthorized') {
        //     errors.message = 'Unauthorized, Please Login or Register!';
        //     errors.status = 401;
        // }
        // next(errors);
        return res.json(false);
    }
};
userController.avatar = (req, res, next) => {
    fs.readFile('./public/avatar.png', (err, data) => {
        if (err) {
            res.send(err);
            console.log(err);
        } else {
            res.write(data);
            res.end();
        }
    });
};


module.exports = userController;