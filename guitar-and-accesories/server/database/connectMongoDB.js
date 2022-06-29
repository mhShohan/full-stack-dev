const { MongoClient } = require('mongodb');
const URI = 'mongodb://localhost:27017/guitar-and-accessories';

let client;

const connection = {
    connect: (callback) => {
        if (!client) {
            let initiate = new MongoClient(URI, {
                connectTimeoutMS: 1000,
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            initiate.connect((err, db) => {
                if (err) callback(err, null);
                client = db;
                console.log('Database connected!');
                callback(null, db);
            });
        }
    },
    getDB: () => {
        if (!client) console.log('Database Not connected!');
        return client;
    }
};


module.exports = connection;