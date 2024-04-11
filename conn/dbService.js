const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const centralPool = mysql.createPool({
     host: process.env.HOST,
     user: process.env.USER,
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
     port: process.env.DB_PORT
}).promise()

module.exports = {centralPool}

