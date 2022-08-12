const error = require("../utils/error");
const jwt = require('jsonwebtoken');

const verifyAuth = (req, _res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw error('Please Login or Register!', 400, 'unauthorized');
        const decodedUser = jwt.verify(token, process.env.JWT);

        req.userId = decodedUser._id;
        req.name = decodedUser.name;
        req.userEmail = decodedUser.email;

        next();

    } catch (err) {
        console.log(err);
        let errors = {};
        if (err.type === 'unauthorized') {
            errors.message = 'Unauthorized, Please Login or Register!';
            errors.status = 401;
        }

        next(errors);
    }
};


module.exports = verifyAuth;