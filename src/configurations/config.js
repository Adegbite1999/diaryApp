const Pool = require('pg').Pool;
require('dotenv').config();


const isTest = process.env.NODE_ENV === 'test';
// const isTest = Process.env.NODE_ENV === 'test';
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const connectionString = process.env.DATABASE_TEST
console.log(connectionString)
const pool = new Pool({
    // connectionString: isTest ? process.env.DATABASE_TEST :
connectionString,
    // ssl: isTest,
  })
pool.connect(() =>{
    console.log('connected')
})
module.exports = pool;


