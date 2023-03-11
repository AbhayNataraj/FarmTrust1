const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  retailType: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Retailer = mongoose.model('Retailer', retailerSchema);

module.exports = Retailer;
