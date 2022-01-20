const Pool = require('pg').Pool;
require('dotenv').config();


const isTest = process.env.NODE_ENV === 'test';
// const isTest = Process.env.NODE_ENV === 'test';
const connectionString = isTest ? process.env.DBTEST_URL : process.env.DB_URL;
const config = {
  connectionString: connectionString
}
const pool = new Pool(config)
pool.connect(() =>{
  console.log('connected');
})
module.exports = pool;


