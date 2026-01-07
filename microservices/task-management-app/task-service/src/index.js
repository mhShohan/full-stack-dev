const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRouter = require('./task.routes');
const morgan = require('morgan');
const taskMassageBroker = require('./massage_broker');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api', taskRouter);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('DB Connected Successfully!!!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const main = async () => {
  await connectDb();

  // Start the server
  app.listen(PORT, async () => {
    await taskMassageBroker.rabbitMQConnectionWithRetry();
    console.log(`Task Service is running on port ${PORT}`);
  });
};


main();