const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const router = express.Router();

// MySQL connection pool
const db = mysql.createPool({
    connectionLimit: 10,
    host: '45.91.133.140',
    port: 3306,
    user: 'greenhouse-it-msu',
    password: 'abc123greenhouse',
    database: 'greenhouse-it-msu'
});

// Route for login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';

    db.query(sql, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
        });
    });
});

// Route for changing password
router.post('/change-password', async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    // Check if user exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];

        // Compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect old password' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        db.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username], (err) => {
            if (err) return res.status(500).json({ message: 'Error updating password' });
            return res.status(200).json({ message: 'Password updated successfully' });
        });
    });
});

module.exports = router;
