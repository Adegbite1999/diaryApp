const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;




app.use(express.json());
app.use(cors());

const path = require('./src/routes/index');

app.use('/api/v1', path)

// app.listen(process.env.PORT, () => {
// console.log(`Server Listening On Port: ${port}`);
// })
if(require.main === module){
    app.listen(process.env.PORT, () =>
      console.log(` App listening on port ${process.env.PORT}!`),
    );
  }

module.exports = app;



