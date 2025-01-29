const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        return mongoose.connect('mongodb://localhost:27017/pagination');
    } catch (error) {
        console.log('database connection failed!');
        process.exit(1);
    }
};

module.exports = connectDB;