const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Get all data
app.get('/data', (req, res) => {
  getData()
    .then(data => res.json(data))
    .catch(error => {
      console.error('Error getting data:', error);
      res.status(500).send('Internal Server Error');
    });
});

function getData() {
  return fs.readFile('./data/hotels.json', 'utf-8')
    .then(data => JSON.parse(data))
    .catch(error => {
      console.error('Error reading data file:', error);
      throw error;
    });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
