const Web3 = require('web3');
const DistributorRegistry = require('../../build/contracts/DistributorRegistry.json');

const providerUrl = 'http://localhost:7545'; // Replace with the URL of your Ethereum node
const web3 = new Web3(providerUrl);

const account = '0x75E30F64D71C29c81Ed4AE03c284804F0eB7F631'; // Replace with your Ethereum account address
const contract = new web3.eth.Contract(DistributorRegistry.abi, DistributorRegistry.networks[5777].address);

module.exports = {
  registerDistributor: async function (req, res) {
    const { name, location, distribution } = req.body;
    try {
      const result = await contract.methods.registerDistributor(name, location, distribution).send({
        from: account,
        gas: 3000000
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error registering distributor" });
    }
  },

  updateDistributor: async function (req, res) {
    const { name, location, distribution } = req.body;
    try {
      const result = await contract.methods.updateDistributor(name, location, distribution).send({
        from: account,
        gas: 3000000
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating distributor" });
    }
  },

  removeDistributor: async function (req, res) {
    try {
      const result = await contract.methods.removeDistributor().send({
        from: account,
        gas: 3000000
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error removing distributor" });
    }
  },
};
