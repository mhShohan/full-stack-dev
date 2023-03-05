const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/mern-filtering');
        console.log('Database Connected!');
    } catch (error) {
        console.log('Database Connection Failed!');
    }
};


module.exports = connectDB;