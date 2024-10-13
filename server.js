const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // ใช้สำหรับจัดการกับเส้นทางของไฟล์

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Import routes
const indexRoutes = require('./api/index');
const authRoutes = require('./api/auth');
const plantRoutes = require('./api/plant');
const ldrRoutes = require('./api/ldr'); // นำเข้า LDR API

// Use routes
app.use('/api/indexs', indexRoutes);
app.use('/', authRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api', ldrRoutes); // ใช้ LDR API

// Serve images from a directory
app.use('/images', express.static(path.join(__dirname, 'images'))); // เปลี่ยนที่เก็บไฟล์ภาพตามต้องการ

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
