const mysql = require('mysql');
module.exports = () => mysql.createConnection({
    host: "localhost",
    user: "charcar",
    password: "123456",
    database: 'test'
});