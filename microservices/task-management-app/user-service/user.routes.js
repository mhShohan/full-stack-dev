const { Router } = require('express');
const User = require('./User.model');

const userRouter = Router();

// Create a new user
userRouter.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get user by ID
userRouter.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ data: user, message: 'User fetched successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get all users
userRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users, message: 'Users fetched successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


module.exports = userRouter;

