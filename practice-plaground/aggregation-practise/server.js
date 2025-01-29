const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//middleware
app.use(express.json());
app.use(cors());


app.use('/api/v1', require('./routes'));


app.use((err, req, res, next) => {
    res.json(err);
});

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/test-aggregation');
        console.log('Database Connected!');
        app.listen(4000, () => console.log('http://localhost:4000'));
    } catch (error) {
        console.log(error);
    }
}
connectDB()

