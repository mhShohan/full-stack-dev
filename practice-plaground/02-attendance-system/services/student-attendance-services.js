const AdminAttendance = require("../models/AdminAttendance");

const error = require("../utils/error");
const StudentAttendance = require("../models/StudentAttendance");


const studentAttendanceServices = {};

studentAttendanceServices.get = async (id, userId) => {
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) throw error('Invalid attendance id!', 400);

    if (adminAttendance.status !== 'RUNNING') throw error('No attendance running!', 400);

    let attendance = await StudentAttendance.findOne({ user: userId, adminAttendance: id });
    if (attendance) throw error('Already give attendance', 400);


    attendance = new StudentAttendance({ user: userId, adminAttendance: id });
    return attendance.save();
};

module.exports = studentAttendanceServices;