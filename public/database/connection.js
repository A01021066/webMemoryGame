const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'cmtpFX7Dqu',
    database: 'cmtpFX7Dqu',
    password: "jchNiutDFf",
    port: '3306'
  });


module.exports = pool.promise();
