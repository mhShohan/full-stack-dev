const { Router } = require('express');
const Task = require('./Task.model');
const taskMassageBroker = require('./massage_broker');

const taskRoutes = Router();

// Create new task for a user
taskRoutes.post('/:userId/tasks', async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
      userId
    });

    const savedTask = await newTask.save();

    const message = {
      taskId: savedTask._id,
      userId: savedTask.userId,
      title: savedTask.title,
    };

    await taskMassageBroker.publishMessage(message);

    res.status(201).json({ data: savedTask, message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task', error: error?.message || '' });
  }
});


// Get all tasks for a user
taskRoutes.get('/:userId/tasks', async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ userId });
    res.status(200).json({ data: tasks, message: 'Tasks fetched successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks', error });
  }
});



module.exports = taskRoutes;

