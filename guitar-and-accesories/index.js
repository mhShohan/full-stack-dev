const connection = require('./database/connectMongoDB');

connection.connect((err, db) => {
    if (!err) require('./server');
});