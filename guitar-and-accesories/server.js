const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', require('./routes'));

//global error handler
app.use((err, _req, res, _next) => {
    // console.log(err);
    let message = err.message ? err.message : 'Server Error!';
    let status = err.status ? err.status : 500;
    res.status(status).json({ error: message });
});

app.listen(8000, () => console.log('http://localhost:8000'));
