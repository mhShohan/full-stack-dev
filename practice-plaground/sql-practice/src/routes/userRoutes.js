const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ CREATE user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    const [result] = await db.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );

    res.json({ message: 'User created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ READ all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ READ single user
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;

    const [result] = await db.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, req.params.id]
    );

    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE user
router.delete('/:id', async (req, res) => {
  try {
    await db.execute(
      'DELETE FROM users WHERE id = ?',
      [req.params.id]
    );

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;