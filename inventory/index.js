
const connection = require("./database/mongodb/connection");


connection.connect((err, db) => {
    if (!err) {
        require("./app");
    }

});