const Web3 = require('web3');
const AgriContract = require('../../build/contracts/AgriContract.json');

const providerUrl = 'http://localhost:8545'; // Replace with the URL of your Ethereum node
const web3 = new Web3(providerUrl);

const account = '0x75E30F64D71C29c81Ed4AE03c284804F0eB7F631'; // Replace with your Ethereum account address
const contract = new web3.eth.Contract(AgriContract.abi, AgriContract.networks[5777].address);

module.exports = {
  createProduct: async function (req, res) {
    const { name, description, price } = req.body;
    try {
      const result = await contract.methods.createProduct(name, description, price).send({ from: account });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating product" });
    }
  },

  certifyProduct: async function (req, res) {
    const { productId } = req.params;
    try {
      const result = await contract.methods.certifyProduct(productId).send({ from: account });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error certifying product" });
    }
  },

  distributeProduct: async function (req, res) {
    const { productId } = req.params;
    const { distributor } = req.body;
    try {
      const result = await contract.methods.distributeProduct(productId, distributor).send({ from: account });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error distributing product" });
    }
  },

  sellProduct: async function (req, res) {
    const { productId } = req.params;
    const { retailer } = req.body;
    try {
      const result = await contract.methods.sellProduct(productId, retailer).send({ from: account });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error selling product" });
    }
  },
};
