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

// Route to get indexs
router.get('/', (req, res) => {
    const sql = 'SELECT title, image_blob, description FROM indexs';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        // แปลง BLOB เป็น Base64
        const formattedResults = results.map(item => ({
            title: item.title,
            image_blob: item.image_blob ? `data:image/png;base64,${item.image_blob.toString('base64')}` : null,
            description: item.description
        }));

        // คอมเมนต์หรือเอาบรรทัดนี้ออกเพื่อไม่ให้แสดงผลลัพธ์ใน console
        // console.log(formattedResults); // แสดงผลลัพธ์ใน console
        res.json(formattedResults);
    });
});

module.exports = router;
