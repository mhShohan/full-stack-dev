const router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile('./pages/home.html', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.write(data);
            res.end();
        }
    });
});

router.get('/about', (req, res) => {
    fs.readFile('./pages/about.html', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.write(data);
            res.end();
        }
    });
});

router.get('/contact', (req, res) => {
    fs.readFile('./pages/contact.html', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.status(404).write(data);
            res.end();
        }
    });
});

// Page not found (global)
router.use((req, res, next) => {
    fs.readFile('./pages/not-found.html', (err, data) => {
        if (err) {
            next(err);
        } else {
            res.write(data);
            res.end();
            next();
        }
    });
});


module.exports = router;