const bcrypt = require('bcrypt');
const error = require('../utils/error');
const { generateToken } = require('../utils/utils');
const userServices = require('../services/userServices');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const cloudinary = require('cloudinary');
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
userController.updateAvatar = (req, res, next) => {

    const form = formidable({ multiples: false });
    form.parse(req, async (err, fields, files) => {

        try {
            if (files.avatar.size <= 1000000) {
                if (
                    files.avatar.mimetype === 'image/jpeg' ||
                    files.avatar.mimetype === 'image/jpg' ||
                    files.avatar.mimetype === 'image/JPG' ||
                    files.avatar.mimetype === 'image/png'
                ) {
                    //upload file to cloudinary
                    cloudinary.config({
                        cloud_name: 'dw7t3knez',
                        api_key: '354988245318918',
                        api_secret: 'D8qdzevWEO3k-rcz2L5oNAsd36A',
                        secure: true
                    });

                    const response = await cloudinary.uploader.upload(files.avatar.filepath);

                    res.json({ url: response.url });
                } else throw error('Please select an image file!', 400, 'notImage');
            } else throw error('Image must be less then 1MB', 400, 'largeImage');
        } catch (err) {
            const errors = {};
            console.log(err);
            if (err.type === 'notImage') {
                errors.message = 'Please select an image file!';
            }
            if (err.type === 'largeImage') {
                errors.message = 'Image must be less then 1MB!';
            }
            next(errors);
        }

    });



};
userController.update = async (req, res, next) => {
    const { firstName, lastName, email, title, description, avatar } = req.body;
    try {
        const user = await userServices.findByEmail(email);

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.avatar = avatar || user.avatar;
        user.title = title || user.title;
        user.description = description || user.description;

        await user.save();

        res.json(user);

    } catch (err) {
        next(err);
    }
};

module.exports = userController;