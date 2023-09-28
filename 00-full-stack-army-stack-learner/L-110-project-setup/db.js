const fs = require('fs/promises');
const path = require('path');

class DatabaseConnection {
    constructor(path) {
        this.db = null;
        this.dbURL = path;
    }

    async connect() {
        const dbSTR = await fs.readFile(this.dbURL, { encoding: 'utf-8' });
        this.db = JSON.parse(dbSTR);
    }
    async write() {
        if (this.db) {
            await fs.writeFile(this.dbURL, JSON.stringify(this.db));
        }
    }
}

const databaseConnection = new DatabaseConnection(path.resolve(...process.env.DB_URL.split('/')));

module.exports = databaseConnection;