const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

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
  
  
  mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const Hotel = mongoose.model('Hotel', hotelSchema);
    console.log('Berhasil terhubung ke MongoDB Atlas');

    router.get('/', (req, res) => {
        res.json({
          data:"ini adalah halaman utama"
        });
    });

    router.get('/hotels', (req, res) => {
        Hotel.find({}).then((hotels,error) => {
          if (error) {
            console.error('Gagal mendapatkan pengguna', error);
            res.status(500).send('Terjadi kesalahan server');
            return;
          }
          res.json(hotels);
        });
      });

    })
    .catch((err) => {
        console.error('Koneksi MongoDB gagal', err);
    });

    
    module.exports = router;