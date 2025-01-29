const AdminAttendance = require('../models/AdminAttendance');
const error = require('../utils/error');
const { addMinutes, isAfter } = require('date-fns');

const handler = {};

handler.create = async () => {
    const running = await handler.running();
    if (running) throw error('Already running', 400);

    const attendance = new AdminAttendance({});
    return attendance.save();
};

handler.running = async () => {
    return await AdminAttendance.findOne({ status: 'RUNNING' });
};

handler.status = async () => {
    const running = await handler.running();
    if (!running) throw error('No Running status', 404);
    const started = addMinutes(new Date(running.createdAt), running.timeLimit);

    if (isAfter(new Date(), started)) {
        running.status = 'COMPLETED';
        await running.save();
    }
    return running;
};

handler.disable = async () => {
    const running = await handler.running();
    if (!running) throw error('No Running status', 404);

    running.status = 'COMPLETED';
    return running.save();
};

module.exports = handler;