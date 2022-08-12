const taskServices = require('../services/taskServices');
const error = require('../utils/error');
const { isValidId } = require('../utils/utils');
const taskController = {};

taskController.get = async (req, res, next) => {
    try {
        const tasks = await taskServices.getAll(req.userEmail);
        res.status(200).json({ tasks });
    } catch (err) {
        next(err);
    }
};
taskController.singleTask = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
};
taskController.create = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const task = taskServices.create({ title, description, userEmail: req.userEmail });
        await task.save();

        res.status(201).json({ task });
    } catch (err) {
        const errors = {};

        if (err.message.includes('task validation failed')) {
            Object.values(err.errors).forEach((e) => {
                errors[e.properties.path] = e.properties.message;
            });
        }
        next(errors);
    }
};
taskController.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        if (!isValidId(id)) throw error('In Valid ID', 404, 'inValidId');

        await taskServices.update(id, { title, description, status });
        res.status(204).json({ message: 'Updated Successfully!' });
    } catch (err) {
        next(err);
    }
};
taskController.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) throw error('In Valid ID', 404, 'inValidId');

        await taskServices.delete(id);
        res.status(204).json({ message: 'Deleted Successfully!' });
    } catch (err) {
        next(err);
    }
};

module.exports = taskController;