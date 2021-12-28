const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;




app.use(express.json());



app.listen(process.env.PORT, () => {
console.log(`Server Listening On Port  ${port}`);
})





