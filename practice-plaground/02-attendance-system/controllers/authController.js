const { loginService, registerService } = require('../services/authService');

const handler = {};

handler.registerUser = async (req, res, next) => {
    if (req.body.password.length <= 6) return res.status(400).json({ message: 'password must have 6 characters!' });

    try {
        const newUser = await registerService(req.body);
        return res.status(201).json({ message: 'User Created Successfully', newUser });
    } catch (error) {
        next(error);
    }
};

handler.loginUser = async (req, res, next) => {
    try {
        const { token } = await loginService(req.body);

        return res.status(200).json({ message: 'User Login Successfully', token });
    } catch (error) {
        next(error);
    }
};

module.exports = handler;