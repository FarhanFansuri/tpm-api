const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const serverless = require('serverless-http')
const app = express();
const port = 3000;
const data = require('../data/data.js')

app.use(bodyParser.json());

// Get all data
app.get('/data', (req, res) => {
  console.log("hello")
  res.json(data)
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports.handler = serverless(app)