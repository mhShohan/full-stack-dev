const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const config = require('../config/config');

async function migrate() {
  const connection = await mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    multipleStatements: true
  });

  try {
    // ensure DB exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.db.database}`);
    await connection.query(`USE ${config.db.database}`);

    // create migrations table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE,
        run_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // get executed migrations
    const [rows] = await connection.query(`SELECT name FROM migrations`);
    const executed = rows.map(r => r.name);

    const sqlFilesPath = path.join(process.cwd(), 'src', 'migrations', 'sql');
    const files = fs.readdirSync(sqlFilesPath).sort();

    for (const file of files) {
      if (executed.includes(file)) {
        console.log(`⏭ Skipping migration: ${file}`);
        continue;
      }

      const sql = fs.readFileSync(path.join(sqlFilesPath, file), 'utf-8');

      await connection.query(sql);

      // mark as executed
      await connection.query(
        `INSERT INTO migrations (name) VALUES (?)`,
        [file]
      );

      console.log(`Migration Completed: ${file}`);
    }

    console.log('All migrations completed!');
    const [finalRows] = await connection.query(`SELECT * FROM migrations`);
    console.table(finalRows);
  } catch (err) {
    console.error('Migration Failed:', err);
  } finally {
    await connection.end();
  }
}

migrate();