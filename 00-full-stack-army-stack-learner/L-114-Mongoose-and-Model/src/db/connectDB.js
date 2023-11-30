const mongoose = require('mongoose');

// env variables
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Database Connected!');
};

module.exports = connectDB;