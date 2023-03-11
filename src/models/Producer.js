const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  }
  // address: {
  //   type: String,
  //   required: true
  // }
});

const Producer = mongoose.model('Producer', producerSchema);

module.exports = Producer;
