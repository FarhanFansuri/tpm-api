const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const serverless = require('serverless-http')
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Get all data
app.get('/data', (req, res) => {
  getData()
    .then(data => res.json(data))
    .catch(error => {
      console.log('Error getting data:', error);
      res.status(500).send(error);
    });
});

function getData() {
  return fs.readFile('../data/hotels.json', 'utf-8')
    .then(data => JSON.parse(data))
    .catch(error => {
      console.error('Error reading data file:', error);
      throw error;
    });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports.handler = serverless(app)