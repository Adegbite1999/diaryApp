const Pool = require('pg').Pool;
require('dotenv').config();


const isTest = process.env.NODE_ENV === 'test';
// const isTest = Process.env.NODE_ENV === 'test';
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const connectionTest = `postgresql://${process.env.DATABASE_TEST_USER}:${process.env.DATABASE_TEST_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE_TEST_USER}`;

const pool = new Pool({
   connectionString: "postgres://cavdcjmy:OfbuFgoKWS6a3OlQEC0odLIs7W_s0bWB@abul.db.elephantsql.com/cavdcjmy"
  //  isTest? connectionTest : connectionString
  })
pool.connect(() =>{
    console.log('connected')
})
module.exports = pool;


