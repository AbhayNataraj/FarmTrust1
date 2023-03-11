const mongoose = require('mongoose');

//should reference ObjectID data type

const agriSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    ref: 'Producer',
    required: true,
  },
  distributor: {
    //type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: 'Distributor',
  },
  retailer: {
    //type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: 'Retailer',
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Agri = mongoose.model('Agri', agriSchema);

module.exports = Agri;
