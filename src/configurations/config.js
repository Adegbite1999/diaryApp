const Pool = require('pg').Pool;
require('dotenv').config();


const isProduction = process.env.NODE_ENV === 'production';
const connectionString = isProduction ? process.env.DATABASE_URL : process.env.DB_URL;
const config = {
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
}
}
const pool = new Pool(config)
pool.connect(() =>{
  console.log('connected');
})
module.exports = pool;


