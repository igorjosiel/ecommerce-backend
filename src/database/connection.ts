const mysql = require('mysql2/promise');

export const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'myecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});