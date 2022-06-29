const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/inventory";

let client;

const connection = {
    connect: (cb) => {
        if (!client) {
            const initiate = new MongoClient(uri, { connectTimeoutMS: 1000, useUnifiedTopology: true, useNewUrlParser: true });
            initiate.connect((err, db) => {
                if (err) cb(err, null);
                client = db;
                console.log("connected to database...");
                cb(null, db);
            });
        }
    },

    getDB: () => {
        if (!client) return "not connected";
        return client;
    }

};

module.exports = connection;
