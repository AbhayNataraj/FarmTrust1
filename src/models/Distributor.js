const mongoose = require('mongoose');

const distributorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  distribution: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Distributor = mongoose.model('Distributor', distributorSchema);

module.exports = Distributor;
