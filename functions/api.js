const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');


const app = express();
const port = 3000;

app.use(bodyParser.json());

const mongoURL = 'mongodb+srv://user-x:RmZNBYRmpa4X4AoV@shared-cluster.otiswnp.mongodb.net/hotel_database?retryWrites=true&w=majority';

const hotelSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    HotelId: String,
    HotelName: String,
    Description: String,
    Description_fr: String,
    Category: String,
    Tags: [String],
    ParkingIncluded: Boolean,
    LastRenovationDate: Date,
    Rating: Number,
    Address: {
      StreetAddress: String,
      City: String,
      StateProvince: String,
      PostalCode: String,
      Country: String
    },
    Location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: [Number]
    },
    Rooms: [{
      Description: String,
      Description_fr: String,
      Type: String,
      BaseRate: Number,
      BedOptions: String,
      SleepsCount: Number,
      SmokingAllowed: Boolean,
      Tags: [String]
    }]
  });
  
  const Hotel = mongoose.model('Hotel', hotelSchema);

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Berhasil terhubung ke MongoDB Atlas');

    app.get('/', (req, res) => {
        res.send("<h1 style='margin-left:20px'>404 Not Found</h1>");
    });

    app.get('/hotels', (req, res) => {
        Hotel.find({}).then((hotels,error) => {
          if (error) {
            console.error('Gagal mendapatkan pengguna', error);
            res.status(500).send('Terjadi kesalahan server');
            return;
          }
          res.json(hotels);
        });
      });

      app.post('/post/hotels', (req, res) => {
        const newUser = new User(req.body);
        newUser.save((err) => {
          if (err) {
            console.error('Gagal menambahkan pengguna', err);
            res.status(500).send('Terjadi kesalahan server');
            return;
          }
          res.sendStatus(201);
        });
      });
    module.exports.handler = serverless(app)
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Koneksi MongoDB gagal', err);
  });
