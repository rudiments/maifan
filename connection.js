const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"Parad1dle5",
    database:"maifan"
})

module.exports = db