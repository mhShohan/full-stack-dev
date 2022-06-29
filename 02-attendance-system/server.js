const express = require('express');
const connectDB = require('./db');
const app = express();

app.use(express.json());


app.use(require('./routes'));

//error handler
app.use((error, _req, res, _next) => {
    // console.log(error);
    let message = error.message ? error.message : 'Server error!';
    let status = error.status ? error.status : 500;

    res.status(status).json({ errors: { message, ...error } });
});

connectDB('mongodb://localhost:27017/attendance-system-db').then(() => {
    app.listen(8000, () => console.log(`http://localhost:8000`));
}).catch((error) => console.log(error));