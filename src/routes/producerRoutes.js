const express = require('express');
//const { artifacts } = require("truffle");
const router = express.Router();
const Producer = require('../models/Producer');
//const ProducerRegistry = artifacts.require('ProducerRegistry');

const {registerProducer, updateProducer, removeProducer } = require('../controllers/producerController');

router.post('/register', async (req, res) => {
  try {
    const { name, location, product } = req.body;
    // const address = req.body.address.toLowerCase();
    //const producerRegistry = await ProducerRegistry.deployed();
    const producer = new Producer({ name, location, product });
    await producer.save();
    await registerProducer(req, res);
    //res.json({ message: `Producer with address ${address} registered successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering producer' });
  }
});

router.put('/update', async (req, res) => {
  try {
    const { name, location, product } = req.body;
    const address = req.body.address.toLowerCase();
    //const producerRegistry = await ProducerRegistry.deployed();
    await updateProducer(name, location, product, { from: address });
    const producer = await Producer.findOneAndUpdate({ address }, { name, location, product }, { new: true });
    if (!producer) {
      throw new Error('Producer not found');
    }
    res.json({ message: `Producer with address ${address} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating producer' });
  }
});

router.delete('/remove', async (req, res) => {
  try {
    const address = req.body.address.toLowerCase();
    //const producerRegistry = await ProducerRegistry.deployed();
    await removeProducer({ from: address });
    const producer = await Producer.findOneAndDelete({ address });
    if (!producer) {
      throw new Error('Producer not found');
    }
    res.json({ message: `Producer with address ${address} removed successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error removing producer' });
  }
});

//track the product

//payment status

//list of distributors and their storage

module.exports = router;
