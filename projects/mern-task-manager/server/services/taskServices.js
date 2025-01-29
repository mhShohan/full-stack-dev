const taskServices = {};
const Task = require('../model/Task');

taskServices.create = (body) => new Task(body);
taskServices.getAll = (userEmail) => Task.find({ userEmail });
taskServices.update = (id, data) => Task.findByIdAndUpdate(id, { ...data }, { new: true });
taskServices.delete = (id) => Task.findByIdAndDelete(id);

module.exports = taskServices;