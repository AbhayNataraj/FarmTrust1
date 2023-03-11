const express = require('express');
const router = express.Router();
//const { artifacts } = require("truffle");
const UserController= require('../controllers/userController');
//const UserRegistry = artifacts.require('UserRegistry');

router.post('/user/register', async (req, res) => {
  try {
    //const userRegistry = await UserRegistry.deployed();
    console.log("jkknkbnljbkjb=============");
    await UserController.registerUser(req, res);
    //res.send(`User with address registered successfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
});

router.post('/user/update', async (req, res) => {
  try {
    //const userRegistry = await UserRegistry.deployed();
    const name = req.body.name;
    const location = req.body.location;
    await UserController.updateUser(name, location, { from: req.body.address });
    res.send(`User with address ${req.body.address} updated successfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating user');
  }
});

router.post('/user/remove', async (req, res) => {
  try {
    //const userRegistry = await UserRegistry.deployed();
    await UserController.removeUser({ from: req.body.address });
    res.send(`User with address ${req.body.address} removed successfully`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error removing user');
  }
});

//available products

//previously bought 


module.exports = router;
