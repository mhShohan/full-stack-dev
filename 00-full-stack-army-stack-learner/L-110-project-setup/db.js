const fs = require('fs/promises');
const path = require('path');

class DatabaseConnection {
    constructor(path) {
        this.db = null;
        this.dbURL = path;
    }

    async read() {
        const dbSTR = await fs.readFile(this.dbURL, { encoding: 'utf-8' });
        this.db = JSON.parse(dbSTR);
    }
    async write() {
        if (this.db) {
            await fs.writeFile(this.dbURL, JSON.stringify(this.db));
        }
    }
    async get() {
        if (this.db) return this.db;
        await this.read();
        return this.db;
    }
}

const connection = new DatabaseConnection(path.resolve(...process.env.DB_URL.split('/')));

module.exports = connection;