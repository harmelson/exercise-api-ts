import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@xxx',
    database: 'TypeScriptExpress',
});

export default connection;