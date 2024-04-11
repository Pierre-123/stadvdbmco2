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

const centralPool2 = mysql.createPool({
     host: process.env.HOST,
     user: process.env.USER,
     password: process.env.PASSWORD,
     database: process.env.DATABASE2,
     port: process.env.DB_PORT
}).promise()

const luzonPool = mysql.createPool({
     host: process.env.LUZON_HOST,
     user: process.env.LUZON_USER,
     password: process.env.LUZON_PASSWORD,
     database: process.env.LUZON_DATABASE,
     port: process.env.LUZON_DB_PORT
}).promise()

const visMinPool = mysql.createPool({
     host: process.env.VISMIN_HOST,
     user: process.env.VISMIN_USER,
     password: process.env.VISMIN_PASSWORD,
     database: process.env.VISMIN_DATABASE,
     port: process.env.VISMIN_DB_PORT
}).promise()

module.exports = {centralPool, centralPool2, luzonPool, visMinPool}

