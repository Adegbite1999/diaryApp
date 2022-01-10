const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('../configurations/config')

const authorization = async (req, res, next) => {

  try {
    // 1.access token from request header
    const token = await req.header('token');

    //2. check if token is valid
    if (!token) {
      return res.status(403).json({ message: 'unauthorized!' })
    }
    const payload = await jwt.verify(token, process.env.TOKEN_SECRET);
    // check if user exists 
    const query = "SELECT * FROM users WHERE id =$1"
    const { rows } = await pool.query(query, [payload.user]);
    if (!rows[0]) {
      return res.status(403).json({ message: "unauthorized" })
    }
    // 3. verify token
    req.user = payload.user;
    return next()
  } catch (error) {
    console.log(error)
    res.status(403).json({ message: "unauthorized!" })
  }
}

module.exports = { authorization }