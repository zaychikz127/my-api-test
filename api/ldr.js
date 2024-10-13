// api/ldr.js
const express = require('express');
const router = express.Router();

let ldrValue = null; // ตัวแปรสำหรับเก็บค่า LDR

// Route สำหรับรับค่า LDR
router.post('/ldr', (req, res) => {
    ldrValue = req.body.value; // เก็บค่า LDR จาก request body
    //console.log(`Received LDR value: ${ldrValue}`);
    res.status(200).json({ message: 'LDR value received', value: ldrValue });
});

// Route สำหรับส่งค่า LDR ล่าสุด
router.get('/ldr', (req, res) => {
    res.status(200).json({ value: ldrValue });
});

module.exports = router;
