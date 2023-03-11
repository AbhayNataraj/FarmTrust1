const Web3 = require('web3');
const UserController = require('../../build/contracts/UserRegistry.json');
const User = require('../models/User')

const providerUrl = 'http://localhost:7545'; // Replace with the URL of your Ethereum node
const web3 = new Web3(providerUrl);

const account = '0xfaB985f8474B79AFdfeF54b25eFc3F33F6E8376d'; // Replace with your Ethereum account address
const contract = new web3.eth.Contract(UserController.abi, UserController.networks[5777].address);

module.exports = {
  registerUser: async (req, res) => {
    console.log(req.body.dateJoined)
    const user = new User(req.body);
    const { name, email, password, role, address, phone, dateJoined  } = req.body;
    try {
      const result = await contract.methods.registerUser(name, email, password, role, address, phone, dateJoined ).send({ from: account , gas:'1000000'});
      await user.save()
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error registering user");
    }
  },

  updateUser: async function (req, res) {
    const { name, email, age } = req.body;
    try {
      const result = await contract.methods.updateUser(name, email, age).send({ from: account });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error updating user");
    }
  },

  removeUser: async function (req, res) {
    try {
      const result = await contract.methods.removeUser().send({ from: account });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error removing user");
    }
  },
};