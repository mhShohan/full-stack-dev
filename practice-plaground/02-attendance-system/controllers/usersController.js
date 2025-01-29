const { registerService } = require("../services/authService");
const { findUsers, findUserByProperty, updateUser } = require("../services/userService");
const error = require("../utils/error");



const handler = {};

handler.getUsers = async (req, res, next) => {
    try {
        /**
         * @TODO filer, sort, pagination, select
         */
        const users = await findUsers();
        if (!users) throw error('No User found!', 404);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
handler.getUserById = async (req, res, next) => {
    try {
        const { userID } = req.params;
        const user = await findUserByProperty('_id', userID);
        if (!user) throw error('User not found!', 404);

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
handler.postUsers = async (req, res, next) => {
    const { name, email, password, roles, accountStatus } = req.body;
    try {
        const user = await registerService({ name, email, password, roles, accountStatus });
        res.status(201).json({ message: 'User created Successfully', data: user });
    } catch (error) {
        next(error);
    }
};
handler.patchUsersByID = async (req, res, next) => {
    const { userID } = req.params;
    const { name, roles, accountStatus } = req.body;
    try {
        const user = await findUserByProperty('_id', userID);
        if (!user) throw error('User not found!', 404);

        user.name = name ?? user.name;
        user.roles = roles ?? user.roles;
        user.accountStatus = accountStatus ?? user.accountStatus;

        await user.save();
        return res.status(200).json({ message: 'User Updated!', data: user });
    } catch (error) {
        next(error);
    }
};
handler.putUsersByID = async (req, res, next) => {
    const { userID } = req.params;
    const { name, roles, email, accountStatus } = req.body;

    try {
        const user = await updateUser(userID, { name, email, roles, accountStatus });
        if (!user) throw error('User not found!', 404);

        return res.status(200).json({ message: 'user Updated!', data: user });
    } catch (error) {
        next(error);
    }
};

handler.deleteUserById = async (req, res, next) => {
    const { userID } = req.params;
    try {
        const user = await findUserByProperty('_id', userID);
        if (!user) throw error('User not found!', 404);

        await user.remove();
        return res.status(203).json({ message: 'User deleted!' });
    } catch (error) {
        next(error);
    }
};

module.exports = handler;


///video start ===>> 1.30 hour