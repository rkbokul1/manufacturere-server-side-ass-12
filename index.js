const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');
require('dotenv').config();

// cors
app.use(cors());
app.use(express.json())

// main api

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App is Running on port ${port}`)
})