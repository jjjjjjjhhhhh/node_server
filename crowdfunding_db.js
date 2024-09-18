const mysql = require('mysql2/promise');

async function connectData() {
    try {
        return await mysql.createConnection({
            host: '127.0.0.1',    // 数据库地址
            user: 'root', // 数据库用户名
            database: 'crowdfunding_db', // 数据库名
            password: '', // 数据库密码
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    } catch (e) {
        console.log(e);

    }
}

module.exports = connectData;