const mysql = require('mysql2/promise');
const config = require('./config');

async function migrate() {
  const connection = await mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    multipleStatements: true // IMPORTANT
  });

  try {
    const sql = `
      CREATE DATABASE IF NOT EXISTS ecommerce_db;

      USE ecommerce_db;

      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        gender ENUM('Male', 'Female', 'Other'),
        date_of_birth DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;

    await connection.query(sql);

    console.log('✅ Migration completed!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await connection.end();
  }
}

migrate();