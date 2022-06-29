const studentAttendanceServices = require("../services/student-attendance-services");
const adminAttendanceServices = require("../services/adminAttendanceServices");

const studentAttendanceController = {};

studentAttendanceController.getAttendance = async (req, res, next) => {
    try {
        const attendance = await studentAttendanceServices.get(req.params.id, req.user._id);

        res.status(201).json(attendance);
    } catch (error) {
        next(error);
    }
};
studentAttendanceController.getAttendanceStatus = async (_req, res, next) => {
    try {
        const running = await adminAttendanceServices.status();

        return res.status(200).json(running);
    } catch (error) {
        next(error);
    }
};

module.exports = studentAttendanceController;