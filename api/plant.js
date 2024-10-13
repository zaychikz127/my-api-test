const express = require('express');
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

// Route to get daily plant data
router.get('/daily-plant-data', (req, res) => {
    const query = 'SELECT * FROM daily_plant_data';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Failed to fetch plant data' });
        }
        res.json(results);
    });
});

module.exports = router;
