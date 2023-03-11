const Web3 = require('web3');
const ProducerContract = require('../../build/contracts/ProducerRegistry.json');

const providerUrl = 'http://localhost:7545'; // Replace with the URL of your Ethereum node
const web3 = new Web3(providerUrl);

const account = '0x6bef524065800f5E4C2eB6A0b078750f13A8f10C'; // Replace with your Ethereum account address
const contract = new web3.eth.Contract(ProducerContract.abi, ProducerContract.networks[5777].address);

module.exports = {
  registerProducer: async (req, res)=>{
    const {name, location, product} = req.body;
    try {
      const result = await contract.methods.registerProducer(name, location, product).send({
        from: account,
        gas: 3000000
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error registering prodcuer" });
    }
  },


  updateProducer: async (req, res)=>{
    const { name, location, product } = req.body;
    try {
      const result = await contract.methods.updateProducer(name, location, product).send({
        from: account,
        gas: 3000000
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating distributor" });
    }
  },

  removerProducer: async (req, res)=>{
    try {
      const result = await contract.methods.removeProducer().send({
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





// module.exports = {
//   createProduct: async function (req, res) {
//     const { name, description, price } = req.body;
//     try {
//       const result = await contract.methods.createProduct(name, description, price).send({ from: account });
//       res.status(200).json(result);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Error creating product" });
//     }
//   },

//   certifyProduct: async function (req, res) {
//     const { productId } = req.params;
//     try {
//       const result = await contract.methods.certifyProduct(productId).send({ from: account });
//       res.status(200).json(result);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Error certifying product" });
//     }
//   },

//   distributeProduct: async function (req, res) {
//     const { productId } = req.params;
//     const { distributor } = req.body;
//     try {
//       const result = await contract.methods.distributeProduct(productId, distributor).send({ from: account });
//       res.status(200).json(result);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Error distributing product" });
//     }
//   },

//   sellProduct: async function (req, res) {
//     const { productId } = req.params;
//     const { retailer } = req.body;
//     try {
//       const result = await contract.methods.sellProduct(productId, retailer).send({ from: account });
//       res.status(200).json(result);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Error selling product" });
//     }
//   },
// };
