var mysql = require("mysql");
var db = mysql.createPool({
    connectionLimit: 100,
    host:"localhost",
    user: "root",
    password: "pokemon",
    database:"IT_training"
})
module.exports = db;