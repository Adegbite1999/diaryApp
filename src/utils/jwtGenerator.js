const jwt = require('jsonwebtoken');
require('dotenv').config();

 const jwtGenerator = (user_id) =>{
     const payload = {user: user_id}

  return   jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "7days"})
 }

 module.exports = jwtGenerator;