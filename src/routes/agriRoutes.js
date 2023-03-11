const express = require('express');
const router = express.Router();
const Agri = require('../models/Agri');
//const AgriRegistry = artifacts.require('C:\Users\chara\OneDrive\Desktop\Farmtrust\contracts\AgriContract.sol');
const AgriController = require('../controllers/agriController');


router.post('/create', async (req, res) => {
  try {
    //const agriRegistry = await AgriRegistry.deployed();
    const agri = new Agri({
      name: req.body.name,
      location: req.body.location,
      producer: req.body.producer,
      description: req.body.description,
      price: req.body.price
      //time since harvest
    });
    //await agriRegistry.registerAgri(agri.name, agri.location, agri.specialty, { from: agri.address });
    await AgriController.createProduct(req,res);
    await agri.save();
    res.send(`Agri with address ${agri.address} registered successfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering agri');
  }
});

router.put('/certify/:id', async (req, res) => {
  try {
    const agri = await Agri.findOne({ _id: req.params.id });
    if (!agri) {
      return res.status(404).send('Agri not found');
    }
    //const agriRegistry = await AgriRegistry.deployed();
    agri.certified = req.body.certified;
    await AgriController.certifyProduct(req, res)
    //await agriRegistry.updateAgri(agri.name, agri.location, agri.specialty, { from: agri.address });
    await agri.save();
    res.send(`Agri with id ${agri._id} certified successfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error certifying agri');
  }
});

router.put('/distribute/:id', async (req, res) => {
  try {
    const agri = await Agri.findOne({ _id: req.params.id });
    if (!agri) {
      return res.status(404).send('Agri not found');
    }
    await AgriController.distributeProduct(req,res)
    //const agriRegistry = await AgriRegistry.deployed();
    //await agriRegistry.removeAgri({ from: agri.address });
    agri.distributor = req.body.distributor;
    await agri.save();
    res.send(`Agri with id ${agri._id} ditributed successfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error removing agri');
  }
});

  router.put('/sell/:id', async (req, res) => {
    try {
      const agri = await Agri.findOne({ _id: req.params.id });
      if (!agri) {
        return res.status(404).send('Agri not found');
      }
      await AgriController.sellProduct(req,res)
      //const agriRegistry = await AgriRegistry.deployed();
      //await agriRegistry.removeAgri({ from: agri.address });
      agri.retailer = req.body.retailer;
      await agri.save();
      res.send(`Agri with id ${agri._id} sold successfully`);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error selling agri');
    }
});

//tracking the product

module.exports = router;
