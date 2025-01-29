const adminAttendanceServices = require("../services/adminAttendanceServices");

const handler = {};

handler.getEnable = async (req, res, next) => {
    try {
        const attendance = await adminAttendanceServices.create();
        return res.status(201).json({ message: 'attendance enable', attendance });
    } catch (error) {
        next(error);
    }
};
handler.getDisable = async (req, res, next) => {
    try {
        const running = await adminAttendanceServices.disable();
        return res.status(200).json({ message: 'attendance disabled', status: running });
    } catch (error) {
        next(error);
    }
};

handler.getStatus = async (req, res, next) => {
    try {
        const running = await adminAttendanceServices.status();

        return res.status(200).json(running);
    } catch (error) {
        next(error);
    }
};

module.exports = handler;