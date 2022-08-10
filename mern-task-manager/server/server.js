const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1', require('./routes'));

//Database Connection
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { connectTimeoutMS: 5000 }).then(() => {
    console.log('Database Connected!');
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}).catch(err => {
    console.error(err);
});