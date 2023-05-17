const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const serverless = require('serverless-http')
const app = express();
const port = 3000;
const data = require('../data/data.js')
const books = require('../data/books.js')

app.use(bodyParser.json());

// Get all data
app.get('/api/hotels/info', (req, res) => {
  res.json(data)
});

//Get all data books
app.get('/api/v1/amazon/books', (req, res) => {
  res.json(books)
});

app.get('/', (req, res) => {
   res.redirect('/welcome');
});

app.get('/welcome', (req, res) => {
  res.send(`
  <h1 style='margin-left:50px; margin-top:40px'>Welcome to my API</h1>
  <p style='margin-left:50px; margin-top:10px; font-size: 20px'>what's your code?<p>
  <h5 style='margin-left:50px; margin-top:10px; font-size: 20px'>GET : /api/hotels/info</h5>
  `)
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports.handler = serverless(app)