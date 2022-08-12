const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

// routes
app.use('/api/v1', require('./routes'));


//global error handler
app.use((err, _req, res, _next) => {
    let status = err.status || 500;
    res.status(status).json({ errors: err });
});


//Database Connection
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { connectTimeoutMS: 5000 }).then(() => {
    console.log('Database Connected!');
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}).catch(err => {
    console.error(err);
});