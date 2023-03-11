const RetailerRegistry = require("../../build/contracts/RetailerRegistry.json");
const web3 = require("web3");

const provider = new web3.providers.HttpProvider("http://localhost:8545");
const web3Instance = new web3(provider);

const contractAddress = "0x75E30F64D71C29c81Ed4AE03c284804F0eB7F631" // Replace with the actual address of the deployed contract
const contract = new web3Instance.eth.Contract(RetailerRegistry.abi, contractAddress);

module.exports = {
  registerRetailer: async function (req, res) {
    const { name, location, sales } = req.body;
    try {
      const result = await contract.methods.registerRetailer(name, location, sales).send({ from: account });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error registering retailer" });
    }
  },

  updateRetailer: async function (req, res) {
    const { name, location, sales } = req.body;
    try {
      const result = await contract.methods.updateRetailer(name, location, sales).send({ from: account });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating retailer" });
    }
  },

  removeRetailer: async function (req, res) {
    try {
      const result = await contract.methods.removeRetailer().send({ from: account });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error removing retailer" });
    }
  },
};
