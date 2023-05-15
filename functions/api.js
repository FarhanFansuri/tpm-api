const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const router = require('../routers/index')

const app = express();
const port = 3000;

app.use(bodyParser.json());
    
app.use('/',router)    

module.exports.handler = serverless(app)

      
      

  