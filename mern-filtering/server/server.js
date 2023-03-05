const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

// routes 
app.use('/api/v1/bootcamps', require('./routes/bootcampsRoutes'));

//error handler 
app.use(errorHandler);

// connectDB();
mongoose.connect('mongodb://127.0.0.1/mern-filtering').then(() => {
    console.log('Database Connected');
    app.listen(4000, () => console.log(`http://localhost:4000`));
}).catch((err) => console.log(err));