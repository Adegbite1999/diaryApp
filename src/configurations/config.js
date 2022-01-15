const Pool = require('pg').Pool;
require('dotenv').config();


const isTest = process.env.NODE_ENV === 'test';
// const isTest = Process.env.NODE_ENV === 'test';
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    connectionString: isTest ? process.env.DATABASE_TEST :
        connectionString,
     ssl: {
        rejectUnauthorized: false
    }
})
module.exports = pool;

