const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', require('./routes'));

//global error handler
app.use((err, _req, res, _next) => {
    // console.log(err);
    let message = err.message ? err.message : 'Server Error!';
    let status = err.status ? err.status : 500;
    res.status(status).json({ message ,status,Errors: err});
});

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGO_URI, { connectTimeoutMS: 500 }).then(()=>{
    console.log('Database connected!')
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}).catch(()=> console.log('Database connection failed!'))

    

