const express = require('express');
const app = express();

app.use(express.static('./public'));

// page routes 
app.use(require('./routes/pageRoute'));


// global error handler 
app.use((err, req, res, next) => {
    const error = {};

    error.message = err.message ? err.message : 'Something went Wrong';
    error.status = err.status ? err.status : 500;

    if (res.status !== 404) {
        return res.json({ "Error: ": error });
    }
});

app.listen(8000, () => console.log('http://localhost:8000 '));
