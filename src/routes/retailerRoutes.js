const express = require('express');
const router = express.Router();

const retailerController = require('../controllers/retailerController');
const Retailer = require('../models/Retailer');

// Create a new retailer
router.post('/', async (req, res) => {
  try {
    const retailer = new Retailer({
      name: req.body.name,
      location: req.body.location,
      products: req.body.products,
      address: req.body.address
    });
    await retailer.save();
    await retailerController.registerRetailer(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating retailer');
  }
});

// Update an existing retailer
router.put('/:id', async (req, res) => {
  try {
    const retailer = await Retailer.findById(req.params.id);
    if (!retailer) {
      return res.status(404).send('Retailer not found');
    }
    retailer.name = req.body.name;
    retailer.location = req.body.location;
    retailer.products = req.body.products;
    await retailer.save();
    await retailerController.updateRetailer(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating retailer');
  }
});

// Remove a retailer
router.delete('/:id', async (req, res) => {
  try {
    const retailer = await Retailer.findById(req.params.id);
    if (!retailer) {
      return res.status(404).send('Retailer not found');
    }
    await retailer.remove();
    await retailerController.removeRetailer(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error removing retailer');
  }
});

//list of distributors and thier available products

//list of producers and their products which are less in quantity

//sold products

//available products to sell

//update the procuct details

module.exports = router;
