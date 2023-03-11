const express = require('express');
const router = express.Router();
const distributorController = require('../controllers/distributorController');
const Distributor = require('../models/Distributor');

// Distributor Registration
router.post('/register', async (req, res) => {
  try {
    const distributor = new Distributor({
      name: req.body.name,
      location: req.body.location,
      product: req.body.product,
      address: req.body.address,
    });
    await distributor.save();
    await distributorController.registerDistributor(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering distributor');
  }
});

// Distributor Update
router.put('/:address', async (req, res) => {
  try {
    const distributor = new Distributor({
      name: req.body.name,
      location: req.body.location,
      product: req.body.product,
      address: req.params.address,
    });
    await distributor.save();
    await distributorController.updateDistributor(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating distributor');
  }
});

// Distributor Removal
router.delete('/:address', async (req, res) => {
  try {
    const distributor = new Distributor({
      address: req.params.address,
    });
    await distributor.remove();
    await distributorController.removeDistributor(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error removing distributor');
  }
});


//Ditributed Products

//track the product

//list of producers and their products

//update the product details

module.exports = router;
