const bcrypt = require('bcrypt');

// ฟังก์ชันเข้ารหัสรหัสผ่าน
function hashPassword(password) {
    const saltRounds = 10; // ระดับความยากในการเข้ารหัส (แนะนำ 10 รอบ)
    
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err); // ถ้ามีข้อผิดพลาด
            }
            resolve(hash); // คืนค่า hash กลับมา
        });
    });
}

// ตัวอย่างการใช้งาน
const plainPassword = 'abc123';

hashPassword(plainPassword)
    .then((hashedPassword) => {
        console.log('Hashed password:', hashedPassword);
        // นำ hashedPassword ไปเก็บใน database
    })
    .catch((err) => {
        console.error('Error hashing password:', err);
    });
