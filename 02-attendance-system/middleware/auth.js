const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function verifyAuth(req, res, next) {

    try {
        let token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: "Invalid token!" });

        token = token.split(' ')[1];
        const decoded = jwt.verify(token, 'secret-key');

        const user = await User.findById(decoded._id);
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = verifyAuth;